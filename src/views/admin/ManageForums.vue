<template>
  <v-container
    v-if="init"
  >
    <v-row
      style="border-bottom: 1px solid #DEE1E6FF;"
    >
      <v-col
        class="text-h5 font-weight-bold py-2"
      >
        {{ $t('forum.FORUMS') }}
      </v-col>
      <v-col
        class="text-right py-2"
      >
        <v-btn
          variant="outlined"
          prepend-icon="mdi-plus"
          color="secondary"
          @click="newForum"
        >
          {{ $t('action.NEW') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row
      class="py-2"
    >
      <v-col>
        <v-text-field
          v-model="search"
          variant="outlined"
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
          :placeholder="$t('hint.SEARCH_NAME_TITLE')"
          @keydown.enter="onEnter"
        >
        </v-text-field>
      </v-col>
      <v-col
        cols="2"
        class="ml-1 pl-0 pr-3 hidden-sm-and-down"
      >
        <ActiveSelector
          v-model="active"
          :getItems="getForums"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-table
          density="comfortable"
          :hover="true"
        >
          <thead>
            <tr>
              <th>{{ $t('common.ID') }}</th>
              <th>{{ $t('forum.FORUM_NAME') }}</th>
              <th>{{ $t('forum.FORUM_TITLE') }}</th>
              <th>{{ $t('forum.THREAD_COUNT') }}</th>
              <th>{{ $t('forum.REPLY_COUNT') }}</th>
              <th>{{ $t('common.DATE_CREATED') }}</th>
              <th>{{ $t('common.ACTIVE') }}</th>
              <th>{{ $t('action.EDIT') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="forum in forums"
              :key="forum.id"
            >
              <td>{{ forum.id }}</td>
              <td
                @click="goForum(forum)"
                style="cursor:pointer"
              >
                {{ forum.name }}
              </td>
              <td
                @click="goForum(forum)"
                style="cursor:pointer"
              >
                {{ forum.title }}
              </td>
              <td>{{ forum.thread_count }}</td>
              <td>{{ forum.reply_count }}</td>
              <td>{{ formatDate(forum.created_at) }}</td>
              <td>
                <v-icon
                  icon="mdi-check-circle-outline"
                  color="success"
                  v-if="forum.is_active"
                ></v-icon>
                <v-icon
                  icon="mdi-close-circle-outline"
                  color="error"
                  v-else
                ></v-icon>
              </td>
              <td
                class="px-1"
              >
                <v-btn
                  flat
                  icon="mdi-text-box-edit-outline"
                  @click="editForum(forum)"
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <NumberPagination
      v-model="pageSize"
      :pagination="pagination"
      :getItems="getForums"
    />

    <v-dialog
      v-model="dialog"
      max-width="500"
      v-if="forum"
    >
      <v-card
        width="100%"
        class="mx-auto mt-3 pa-6 pt-2"
      >
        <v-card-title
          class="mb-4 text-h6 font-weight-bold text-center"
        >
          {{ dialogTitle }}
        </v-card-title>

        <v-form
          v-model="validation"
        >
          <v-row
            class="my-0"
            v-if="editForNew"
          >
            <v-col>
              <div class="text-body-2 font-weight-medium">
                {{ $t('forum.FORUM_NAME') }}
              </div>
              <v-text-field
                v-model="forum.name"
                density="compact"
                :rules="[rules.required, rules.alphaNumber]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
            class="my-0"
          >
            <v-col>
              <div class="text-body-2 font-weight-medium">
                {{ $t('forum.FORUM_TITLE') }}
              </div>
              <v-text-field
                v-model="forum.title"
                density="compact"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row
            class="my-0"
          >
            <v-col>
              <div class="text-body-2 font-weight-medium">
                {{ $t('forum.FORUM_DESCRIPTION') }}
              </div>
              <v-text-field
                v-model="forum.description"
                density="compact"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-list
            density="compact"
            class="py-0"
          >
            <v-list-subheader>
              {{ $t('forum.FORUM_MANAGERS') }}
            </v-list-subheader>

            <v-list-item
              class="py-0"
            >
              <v-combobox
                v-model="managers"
                multiple
                :items="managerList"
                item-title="text"
                item-value="value"
                :rules="[rules.requiredSelect]"
              ></v-combobox>
            </v-list-item>
          </v-list>

          <v-list
            density="compact"
            class="py-0"
          >
            <v-list-subheader>
              {{ $t('forum.FORUM_OPTIONS') }}
            </v-list-subheader>

            <v-list-item
              class="py-0"
            >
              <v-select
                v-model="forum.option.permission_list"
                :label="$t('forum.PERMISSION_LIST')"
                :items="permissions"
                density="comfortable"
              ></v-select>
            </v-list-item>
            <v-list-item
              class="py-0"
            >
              <v-select
                v-model="forum.option.permission_read"
                :label="$t('forum.PERMISSION_READ')"
                :items="permissions"
                density="comfortable"
              ></v-select>
            </v-list-item>
            <v-list-item
              class="py-0"
            >
              <v-select
                v-model="forum.option.permission_write"
                :label="$t('forum.PERMISSION_WRITE')"
                :items="permissions"
                density="comfortable"
              ></v-select>
            </v-list-item>
            <v-list-item
              class="py-0"
            >
              <v-select
                v-model="forum.option.permission_reply"
                :label="$t('forum.PERMISSION_REPLY')"
                :items="permissions"
                density="comfortable"
              ></v-select>
            </v-list-item>

            <v-list-item
              class="py-0"
            >
              <v-row>
                <v-col>
                  <v-switch
                    v-model="forum.is_active"
                    :label="$t('common.ACTIVE')"
                    color="secondary"
                    class="pl-3 py-1"
                  >
                  </v-switch>
                </v-col>
                <v-col>
                  <v-switch
                    v-model="forum.option.support_files"
                    :label="$t('forum.SUPPORT_FILES')"
                    color="secondary"
                    class="pl-3 py-1"
                  >
                  </v-switch>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>

          <v-card-actions
            class="my-0 pa-0"
          >
            <v-btn
              color="secondary"
              block
              :disabled="!validation"
              @click="save"
            >
              {{ $t('action.SAVE') }}
            </v-btn>
          </v-card-actions>

          <v-row
            class="mt-2"
            v-if="!editForNew"
          >
            <v-spacer></v-spacer>
            <v-dialog
              v-model="deleteDialog"
              max-width="400"
              persistent
            >
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  variant="text"
                  color="pale"
                  size="small"
                >
                  {{ $t('action.DELETE_FORUM') }}
                </v-btn>
              </template>

              <v-card
                :title="$t('forum.DELETE_FORUM')"
                :text="$t('hint.DELETE_FORUM_DESCRIPTION')"
              >
                <template v-slot:prepend>
                  <v-icon
                    icon="mdi-alert"
                    color="secondary"
                  ></v-icon>
                </template>
                <template v-slot:actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    variant="outlined"
                    color="pale"
                    @click="deleteDialog = false"
                  >
                    {{ $t('action.CANCEL') }}
                  </v-btn>

                  <v-btn
                    color="secondary"
                    @click="deleteForum"
                  >
                    {{ $t('action.DELETE_FORUM') }}
                  </v-btn>
                </template>
              </v-card>
            </v-dialog>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>

  <v-progress-linear
    indeterminate
    :height="4"
    color="secondary"
    v-else
  ></v-progress-linear>
</template>

<script>
import NumberPagination from '@/components/NumberPagination'
import ActiveSelector from '@/components/ActiveSelector'
import useRules from '@/composables/rules'
import { useFormatDate } from '@/composables/datetime'

export default {
  setup() {
    const { rules } = useRules()
    const { formatDateTime, formatDate } = useFormatDate()
    return { formatDateTime, formatDate, rules }
  },
  components: {
    NumberPagination,
    ActiveSelector,
  },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      editForNew: false,
      managers: [],
      managerList: [],
      forums: [],
      forum: null,
      pagination : null,
      pageSize: 20,
      active: null,
      search: null,
      validation: false,
      init: false,
    }
  },
  computed: {
    permissions() {
      return ['all', 'member', 'staff']
    },
    dialogTitle() {
      if (this.editForNew) {
        return this.$t('forum.NEW_FORUM')
      }
      else {
        return this.forum.name
      }
    },
  },
  mounted() {
    this.getForums()
    this.getManagers()
  },
  methods: {
    dataToItems(data) {
      let items = []

      for (let i=0; i<data.length; i++) {
        let item = {
          'text': data[i]['username'],
          'value': data[i]['id'],
        }
        items.push(item)
      }
      return items
    },
    itemsToData(items) {
      let data = []

      for (let i=0; i<items.length; i++) {
        let item = {
          'id': items[i].value
        }
        data.push(item)
      }
      return data
    },
    getManagers() {
      const vm = this

      this.$axios({
        method: this.$api('ADMIN_STAFFS').method,
        url: this.$api('ADMIN_STAFFS').url,
      })
      .then(function (response) {
        vm.managerList = vm.dataToItems(response.data['data'])
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'ADMIN_STAFFS'))
      })
    },
    getForums(page=1) {
      const vm = this

      let q = ''
      if (this.search) {
        q = '&q=' + this.search
      }

      let active = ''
      if (this.active) {
        active = '&active=' + this.active
      }

      let url = `${this.$api('FORUMS').url}?page_size=${this.pageSize}&page=${page}${active}${q}`

      this.$axios({
        method: this.$api('FORUMS').method,
        url: url,
      })
      .then(function (response) {
        vm.pagination = response.data['pagination']
        vm.forums = response.data['data']

        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'FORUMS'))
      })
    },
    onEnter() {
      this.getForums()
    },
    getForum(pk) {
      const vm = this

      this.$axios({
        method: this.$api('FORUM').method,
        url: this.$api('FORUM').url.replace('{pk}', pk),
      })
      .then(function (response) {
        vm.forum = response.data['data']
        vm.managers = vm.dataToItems(response.data['data']['managers'])
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'FORUM'))
      })
    },
    newForum() {
      this.managers = this.dataToItems([this.$store.getUser])
      this.forum = {
        'name': null,
        'title': null,
        'description': null,
        'managers': this.managers,
        'option': {
          'permission_list': 'member',
          'permission_read': 'member',
          'permission_write': 'member',
          'permission_reply': 'member',
          'permission_vote': 'member',
          'support_files': false,
        },
        'is_active': true,
      }

      this.editForNew = true
      this.dialog = true
    },
    editForum(forum) {
      this.getForum(forum.id)
      this.editForNew = false
      this.dialog = true
    },
    deleteForum() {
      const vm = this

      this.$axios({
        method: this.$api('FORUM_DELETE').method,
        url: this.$api('FORUM_DELETE').url.replace('{pk}', this.forum.id),
      })
      .then(function (response) {
        vm.deleteDialog = false
        vm.dialog = false
        vm.forum = null
        vm.getForums()
        vm.$toast.success(vm.$t('message.DELETED_SUCCESSFULLY'))
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'FORUM_DELETE'))
      })
    },
    goForum(forum) {
      this.$router.push({
        name: 'thread',
        params: {
          forum: forum.name
        }
      })
    },
    save() {
      const vm = this

      let api = 'FORUM_CREATE'
      let url = this.$api(api).url

      if (!this.editForNew) {
        api = 'FORUM_EDIT'
        url = this.$api(api).url.replace('{pk}', this.forum.id)
      }

      this.forum.managers = this.itemsToData(this.managers)

      this.$axios({
        method: this.$api(api).method,
        url: url,
        data: this.forum,
      })
      .then(function (response) {
        if (vm.editForNew) {
          vm.dialog = false
          vm.forum = null
          vm.getForums()
          vm.$toast.success(vm.$t('message.CREATED_SUCCESSFULLY'))
        }
        else {
          vm.forum = response.data['data']
          vm.managers = vm.dataToItems(response.data['data']['managers'])
          vm.$toast.success(vm.$t('message.SAVED_SUCCESSFULLY'))
        }
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, api))
      })
    },
  }
}
</script>
