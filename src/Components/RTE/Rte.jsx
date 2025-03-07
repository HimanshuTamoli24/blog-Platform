import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from 'tinymce'


function Rte({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        initialValue={defaultValue}
                        value={value}
                        onEditorChange={onChange} 
                        init={{
                            branding: false,
                            height: 500,
                            menubar: true, 
                            plugins: 'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
                        }}
                    />
                )}
            />
        </div>
    )
}

export default Rte
