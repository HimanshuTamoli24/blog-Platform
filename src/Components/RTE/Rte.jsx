import React, { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function OnChangePlugin({ setValue, getValues }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const newContent = JSON.stringify(editorState);
                if (newContent !== getValues("content")) {
                    setValue("content", newContent);
                }
            });
        });
    }, [editor, setValue, getValues]);

    return null;
}

function Rte({ label, name, control, setValue, getValues }) {
    const config = {
        namespace: "Editor",
        onError: (error) => console.error(error),
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700">{label}</label>
            <LexicalComposer initialConfig={config}>
                <div className="border p-2">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="p-2 min-h-[150px]" />}
                        placeholder={<div className="text-gray-400 p-2">Type here...</div>}
                    />
                    <HistoryPlugin />
                    <OnChangePlugin setValue={setValue} getValues={getValues} />
                </div>
            </LexicalComposer>
        </div>
    );
}

export default Rte;
