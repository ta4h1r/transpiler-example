const fs = require("mz/fs");

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a .ast file.");
        return;
    }

    const astJson = (await fs.readFile(filename)).toString();
    const statements = JSON.parse(astJson);
    const jsCode = generateJsForStatements(statements);
    // const outputFilename = filename.replace(".ast", ".js");
    // await fs.writeFile(outputFilename, jsCode);
    // console.log(`Wrote ${outputFilename}.`);
}

function generateJsForStatements(statements) {
    const lines = [];
    for (let statement of statements) {
        const line = generateJsForStatementOrExpr(statement);
        lines.push(line);
    }
    return lines.join("\n");
}

function generateJsForStatementOrExpr(node) {
    if (node.type === "method") {
        const methodName = node.signature.name.value;
        if (methodName === "loop") {
            console.log("Found loop method\n");
            const body = node.body;
            body.statements.forEach(statement => {
                const statementType = statement.type
                switch (statementType) {
                    case "fun_call":
                        return handleFunCall(statement);
                    case "control":
                        return handleControl(statement);
                    case "loop":
                        return handleLoop(statement)
                }
            })
        }
        // const varName = node.var_name.value;
        // const jsExpr = generateJsForStatementOrExpr(node.value);
        // const js = `var ${varName} = ${jsExpr};`;
        // return js;
    } else if (node.type === "fun_call") {
        const funName = node.fun_name.value;
        const argList = node.arguments.map((arg) => {
            return generateJsForStatementOrExpr(arg);
        }).join(", ");
        return `${funName}(${argList})`;
    } else {
        throw new Error(`Unhandled AST node type: ${node.type}`);
    }
}

main().catch(err => console.log(err.stack));












function handleControl(statement) {
    const { condition, body } = statement;
    const { checks, logicals: logical_ops, control_keys } = condition;
    console.log("\n\n ")
    let left = checks.map(check => check.left)
    let conditional = checks.map(check => check.conditional.value)
    let right = checks.map(check => check.right)
    let logicals = logical_ops.map(logical => logical.value)
    let key = control_keys.map(key => key.value).join(" ")

    let str = `${key} (`;
    for (let i = 0, n = left.length; i < n; i++) {
        str += `${left[i].type === "fun_call__" ? handleFunCall(left[i]) : left[i].value}`;
        str += ` ${conditional[i]} `;
        str += `${right[i].type === "fun_call__" ? handleFunCall(right[i]) : right[i].value}`;
        if (logicals[i]) {
            str += ` ${logicals[i]} `
        } else if (i === n - 1) {
            str += `) {\n`;
        }
    }

    const { statements } = body;

    statements.forEach((statement, index) => {
        if (statement.type === "fun_call") {
            str += "    " + handleFunCall(statement);
            if (index === statements.length - 1) str += ";\n}\n"
            else str += `;\n`;
        } else if (statement.type === "var_assign") {
            str += "    " + handleVarAssign(statement);
            if(index === statements.length -1) str += ";\n}\n"  
        } else if (statement.type === "var_declare") {
            str += "    " + handleVarDeclare(statement);
            if(index === statements.length -1) str += ";\n}\n"  
        }
    })

    console.log(str);
    return str;
}

function handleFunCall(statement) {
    const { fun_name, arguments } = statement;
    let functionName = fun_name.value;
    let args = arguments.arg_values.map(arg => arg.value);
    let str = `${functionName}(`;
    if (args.length === 0) str += `)`;
    else args.forEach((arg, index) => {
        if (index === args.length - 1) str += `${arg})`
        else str += `${arg}, `
    })
    return str;
}

function handleLoop(statement) {

}










function handleVarAssign(statement) {
    console.log(statement);
    const { var_types, var_name, value } = statement;
    let str = ``; 
    if(var_types) {
        str += var_types.map(t => t.value).join(" ") + ` ${var_name.value} = ${value.value};\n`
    } else {
        str += `${var_name.value} = ${value.value};\n`
    }
    return str; 
}

function handleVarDeclare(statement) {
    console.log(statement)
    return "var_declare ;\n"
}