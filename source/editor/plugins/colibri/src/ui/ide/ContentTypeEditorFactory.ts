/// <reference path="./EditorFactory.ts" />
namespace colibri.ui.ide {

    import io = colibri.core.io;

    export class ContentTypeEditorFactory extends EditorFactory {

        private _name: string;
        private _contentType: string;
        private _newEditor?: (factory?: ContentTypeEditorFactory) => EditorPart;

        constructor(name: string, contentType: string, newEditor: (factory?: ContentTypeEditorFactory) => EditorPart) {
            super();

            this._name = name;
            this._contentType = contentType;
            this._newEditor = newEditor;
        }

        getName() {

            return this._name;
        }

        acceptInput(input: any): boolean {

            if (input instanceof io.FilePath) {

                const contentType = colibri.Platform.getWorkbench()
                    .getContentTypeRegistry().getCachedContentType(input);

                return this._contentType === contentType;
            }

            return false;
        }

        createEditor() {

            return this._newEditor(this);
        }
    }
}