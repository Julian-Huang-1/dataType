
import { createJsonTranslator, createLanguageModel } from "typechat";
import { createTypeScriptJsonValidator } from "typechat/ts";



export async function ai(env, value, schema) {
    const model = createLanguageModel(env);
    schema ? schema : (schema = `export interface Data {
    sentiment: "negative" | "neutral" | "positive"; 
}
`   )
    console.log(schema);
    const validator = createTypeScriptJsonValidator(schema, "Data");
    const translator = createJsonTranslator(model, validator);
    const response = await translator.translate(value);
    if (!response.success) {
        console.log(response.message);
        return;
    }
    // console.log(`The sentiment is ${response.data.sentiment}`);
    console.log(response.data);
}
