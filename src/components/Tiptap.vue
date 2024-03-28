<template>
  <div class="menubar" v-if="editor">
    <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
      <img class="icon" src="@/assets/tiptap/undo.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.UNDO') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
      <img class="icon" src="@/assets/tiptap/redo.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.REDO') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"
    >
      <img class="icon" src="@/assets/tiptap/bold.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.BOLD') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
      <img class="icon" src="@/assets/tiptap/italic.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.ITALIC') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleUnderline().run()" :disabled="!editor.can().chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
      <img class="icon" src="@/assets/tiptap/underline.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.UNDERLINE') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
      <img class="icon" src="@/assets/tiptap/strike.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.STRIKE') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleHighlight().run()" :class="{ 'is-active': editor.isActive('highlight') }">
      <img class="icon" src="@/assets/tiptap/highlight.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.HIGHLIGHT') }}</v-tooltip>
    </button>
    <input
      type="color"
      id="colorPicker"
      @input="editor.chain().focus().setColor($event.target.value).run()"
      :value="editor.getAttributes('textStyle').color"
      style="width:0;height:0;visibility: hidden;"
    >
    <label class="colorButton" for="colorPicker">
      <button
        @click="openColorPicker"
      >
        <img class="icon" src="@/assets/tiptap/font_color.svg" />
        <v-tooltip activator="parent">{{ $t('tiptap.TEXT_COLOR') }}</v-tooltip>
      </button>
    </label>

    <button @click="editor.chain().focus().unsetAllMarks().run()">
      <img class="icon" src="@/assets/tiptap/clear_style.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.CLEAR_STYLE') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().clearNodes().run()">
      <img class="icon" src="@/assets/tiptap/remove.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.CLEAR_NODE') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
      <img class="icon" src="@/assets/tiptap/paragraph.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.PARAGRAPH') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
      h1
      <v-tooltip activator="parent">{{ $t('tiptap.H1') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
      h2
      <v-tooltip activator="parent">{{ $t('tiptap.H2') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
      h3
      <v-tooltip activator="parent">{{ $t('tiptap.H3') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().setHorizontalRule().run()">
      <img class="icon" src="@/assets/tiptap/hr.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.HR') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
      <img class="icon" src="@/assets/tiptap/code.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.CODE') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
      <img class="icon" src="@/assets/tiptap/codeblock.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.CODE_BLOCK') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
      <img class="icon" src="@/assets/tiptap/align_left.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.ALIGN_LEFT') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
      <img class="icon" src="@/assets/tiptap/align_center.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.ALIGN_CENTER') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
      <img class="icon" src="@/assets/tiptap/align_right.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.ALIGN_RIGHT') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
      <img class="icon" src="@/assets/tiptap/ul.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.BULLET_LIST') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
      <img class="icon" src="@/assets/tiptap/ol.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.ORDERED_LIST') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
      <img class="icon" src="@/assets/tiptap/quote.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.BLOCKQUOTE') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().setHardBreak().run()">
      <img class="icon" src="@/assets/tiptap/enter.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.LINE_BREAK') }}</v-tooltip>
    </button>
    <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
      <img class="icon" src="@/assets/tiptap/table.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.TABLE') }}</v-tooltip>
    </button>
    <span
      v-if="editor.isActive('table')"
    >
      <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
        <img class="icon" src="@/assets/tiptap/header_cell.svg" />
        <v-tooltip activator="parent">{{ $t('tiptap.HEADER_CELL') }}</v-tooltip>
      </button>
      <button @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
        <img class="icon" src="@/assets/tiptap/add_col_before.svg" />
        <v-tooltip activator="parent">{{ $t('tiptap.ADD_COL_BEFORE') }}</v-tooltip>
      </button>
      <button @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
        <img class="icon" src="@/assets/tiptap/add_col_after.svg" />
        <v-tooltip activator="parent">{{ $t('tiptap.ADD_COL_AFTER') }}</v-tooltip>
      </button>
      <button @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
        <img class="icon" src="@/assets/tiptap/add_row_before.svg" />
        <v-tooltip activator="parent">{{ $t('tiptap.ADD_ROW_BEFORE') }}</v-tooltip>
      </button>
      <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
        <img class="icon" src="@/assets/tiptap/add_row_after.svg" />
        <v-tooltip activator="parent">{{ $t('tiptap.ADD_ROW_AFTER') }}</v-tooltip>
      </button>
      <button @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">
        <img class="icon" src="@/assets/tiptap/merge_cells.svg" />
        <v-tooltip activator="parent">{{ $t('tiptap.MERGE_SPLIT_CELLS') }}</v-tooltip>
      </button>
      <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
        <img class="icon" src="@/assets/tiptap/delete_col.svg" />
        <v-tooltip activator="parent">{{ $t('tiptap.DELETE_COLUMN') }}</v-tooltip>
      </button>
      <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
        <img class="icon" src="@/assets/tiptap/delete_row.svg" />
        <v-tooltip activator="parent">{{ $t('tiptap.DELETE_ROW') }}</v-tooltip>
      </button>
      <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
        <img class="icon" src="@/assets/tiptap/delete_table.svg" />
        <v-tooltip activator="parent">{{ $t('tiptap.DELETE_TABLE') }}</v-tooltip>
      </button>
    </span>
  </div>

  <editor-content
    :editor="editor"
  />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'

export default {
  props: {
    options: Object
    // content: initial and updated text
    // readonly: read only if true
    // autofocus: Focus the editor on init
    // supportImage: upload and link images
    // supportVideo: embed video
  },
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
      readonly: this.options.readonly || false,
      autofocus: this.options.autofocus || false,
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Table.configure({
          resizable: true,
        }),
        Highlight,
        Link.configure({
          openOnClick: false,
        }),
        TableCell,
        TableRow,
        TableHeader,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Text,
        TextStyle,
        Color,
        Underline,
      ],
      content: this.options.content,
      editable: !this.readonly,
      autofocus: this.autofocus,
      onUpdate: ({ editor }) => {
        this.options.content = editor.getHTML()
      },
    })
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
    openColorPicker() {
      document.getElementById("colorPicker").click()
    },
  }
}
</script>

<style lang="scss">
  @import '@/styles/tiptap.scss'
</style>
