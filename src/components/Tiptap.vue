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
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
      h1
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
      h2
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
      h3
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
    <button
      :class="supportImage ? '' : 'is-disabled'"
      :disabled="!supportImage"
      @click="openImageTab"
    >
      <img class="icon" src="@/assets/tiptap/image.svg" />
      <v-tooltip activator="parent">{{ $t('tiptap.IMAGE') }}</v-tooltip>
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

  <v-dialog
    v-model="imageDialog"
    max-width="500"
  >
    <v-card>
      <v-tabs
        v-model="imageTab"
        color="secondary"
        grow
      >
        <v-tab value="upload">
          {{ $t('tiptap.IMAGE_UPLOAD') }}
        </v-tab>
        <v-tab value="link">
          {{ $t('tiptap.IMAGE_LINK') }}
        </v-tab>
      </v-tabs>

      <v-card-text>
        <v-window
          v-model="imageTab"
        >
          <v-window-item
            value="upload"
          >
            <v-card-text
              class="pa-0"
            >
              <v-file-input
                v-model="file"
                density="compact"
                accept="image/*"
                prepend-icon="mdi-camera"
                :label="file ? null : $t('tiptap.SELECT_IMAGE')"
                @change="handleFileChange"
                @click:clear="clearFile"
                show-size
              >
              </v-file-input>
            </v-card-text>
            <v-card-actions
              class="pa-0"
            >
              <v-spacer></v-spacer>
              <v-btn
                color="secondary"
                @click="insertImage(fileURL)"
              >
                {{ $t('tiptap.INSERT_IMAGE') }}
              </v-btn>
            </v-card-actions>
          </v-window-item>
          <v-window-item
            value="link"
          >
            <v-card-text
              class="pa-0"
            >
              <v-text-field
                v-model="linkURL"
                density="compact"
                prepend-icon="mdi-web"
                :placeholder="$t('tiptap.IMAGE_LINK')"
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions
              class="pa-0"
            >
              <v-spacer></v-spacer>
              <v-btn
                color="secondary"
                @click="insertImage(linkURL)"
              >
                {{ $t('tiptap.INSERT_IMAGE') }}
              </v-btn>
            </v-card-actions>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-dialog>

  <editor-content
    :editor="editor"
  />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Youtube from '@tiptap/extension-youtube'

export default {
  props: {
    options: Object
    // content: initial and updated text
    // readonly: read only if true (default: false)
    // autofocus: Focus the editor on init (default: false)
    // supportImage: upload and link images (default: true)
    // supportVideo: embed video (default: true)
  },
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
      readonly: this.options.readonly || false,
      autofocus: this.options.autofocus || false,
      supportImage: this.options.supportImage != false,
      supportVideo: this.options.supportVideo != false,
      imageDialog: false,
      imageTab: null,
      fileURL: null,
      linkURL: null,
      file: null,
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
        Image,
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
        Youtube.configure({
          autoplay: false,
        })
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
    openImageTab() {
      this.file = null
      this.fileURL = null
      this.linkURL = null
      this.imageDialog = true
    },
    imageUpload(data) {
      var vm = this

      this.$axios({
        method: this.$api('FILE_UPLOAD').method,
        url: this.$api('FILE_UPLOAD').url,
        data: data,
      })
      .then(function (response) {
        vm.fileURL = response.data['data']['file']
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'FILE_UPLOAD'))
      })
    },
    handleFileChange() {
      if (this.file) {
        let formData = new FormData()
        formData.append('file', this.file)
        this.imageUpload(formData)
      }
    },
    clearFile() {
      this.file = null
      this.fileURL = null
    },
    insertImage(url) {
      this.editor.chain().focus().setImage({ src: url }).run()
      this.imageDialog = false
    },
  }
}
</script>

<style lang="scss">
  @import "@/styles/editor";
  @import "@/styles/menubar";
  @import "@/styles/icons";
</style>
