<template>
  <!-- @todo: there is a bug after removing the whole string: 'content' binding will be broken -->
  <!-- @todo: there is a bug with Enter that creates new div node -->
  <div>
    <div
      :id="componentUid"
      ref="input"
      v-mdl
      class="textarea mdl-shadow--2dp"
      contenteditable
      @keydown.enter="onEnter"
      @input="update"
      @blur="preserveSelection"
      @focus="preserveSelection"
    >
      {{ content }}
    </div>
    <div
      v-if="tooltip"
      v-mdl
      class="mdl-tooltip"
      :data-mdl-for="componentUid"
    >
      {{ tooltip }}
    </div>
  </div>
</template>

<script>
    export default {
        name: 'EditableTextareaComponent',
        props: {
            content: {
                type: String,
                required: true,
            },
            tooltip: {
                type: String,
                required: false,
                default: '',
            },
        },
        data () {
            return {
                selectionBaseOffset: null,
                selectionExtentOffset: null,
                componentUid: null,
            };
        },
        watch: {
            content () {
                // this will be invoked right after variable projection from parent scope but before rendering in template
                // we need to wait a tick and recover the broken cursor after variable updating
                this.$nextTick(() => {
                    if (this.focusedNodeIsEditable()) {
                        this.restoreSelection();
                    }
                });
            },
        },
        mounted () {
            this.componentUid = this._uid;
        },
        methods: {
            update (event) {
                // this will be invoked right after the moment when cursor is shifted by new typed key
                // we need to save current position of cursor
                this.preserveSelection();

                this.$emit('onUpdate', event.target.innerText);
            },
            preserveSelection () {
                if (this.focusedNodeIsEditable()) {
                    const selection = window.getSelection();
                    this.selectionBaseOffset = selection.baseOffset;
                    this.selectionExtentOffset = selection.extentOffset;
                } else {
                    this.selectionBaseOffset = null;
                    this.selectionExtentOffset = null;
                }
            },
            restoreSelection () {
                const range = document.createRange();
                const node = this.$el.childNodes[0];

                if (node.nodeValue.length < this.selectionExtentOffset) {
                    return;
                }

                range.setStart(node, this.selectionBaseOffset);
                range.setEnd(node, this.selectionExtentOffset);

                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            },
            focusedNodeIsEditable () {
                const editableNode = this.$el.childNodes[0];
                const focusedNode = window.getSelection().baseNode;

                return editableNode === focusedNode;
            },
        },
    };
</script>

<style lang="scss" scoped>
  @import 'assets/main';

 .textarea {
     padding: $padding;
 }
</style>
