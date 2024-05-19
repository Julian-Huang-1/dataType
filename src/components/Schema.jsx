import React from 'react'
import { useRef } from 'react';
import { useState, forwardRef, useImperativeHandle } from 'react';

const Schema = forwardRef((props, schemaRef) => {
    const [schema, setSchema] = useState("")
   
    useImperativeHandle(schemaRef, () => {
        return {
            schema
        }
    }, [schema])

    return (
        <div>
            <div>
                Write Your Schema
            </div>
            <div>
                <textarea
                    rows={10}
                    cols={40}
                    onChange={(e) => { setSchema(e.target.value) }}
                ></textarea>
            </div>
        </div>

    )
})



export default Schema