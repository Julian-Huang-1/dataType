
import { useEffect, useState, useImperativeHandle } from 'react';
import { Button } from '@headlessui/react'
import { forwardRef } from 'react';


const Env = forwardRef((props, ref) => {
    const [env, setEnv] = useState({
        OPENAI_API_KEY: "",
        OPENAI_MODEL: "",
        OPENAI_ENDPOINT: ""
    })
    function handleClick() {
        localStorage.setItem("env", JSON.stringify(env))
    }
    useEffect(() => {
        const Oldenv = localStorage.getItem("env")
        typeof Oldenv === "string" && setEnv(JSON.parse(Oldenv))
    }, [])
    useImperativeHandle(ref, () => {
        return {
            env
        }
    }, [env])
    return (
        <div>
            <div>
                OPENAI_API_KEY<input type="text" value={env.OPENAI_API_KEY} onChange={(e) => { setEnv({ ...env, OPENAI_API_KEY: e.target.value }) }} />
            </div>
            <div>
                OPENAI_MODEL<input type="text" value={env.OPENAI_MODEL} onChange={(e) => { setEnv({ ...env, OPENAI_MODEL: e.target.value }) }} />
            </div>
            <div>
                OPENAI_ENDPOINT<input type="text" value={env.OPENAI_ENDPOINT} onChange={(e) => { setEnv({ ...env, OPENAI_ENDPOINT: e.target.value }) }} />
            </div>
            <button onClick={handleClick}>save</button>
            <Button>Mui-save</Button>
        </div>

    )
})


export default Env 