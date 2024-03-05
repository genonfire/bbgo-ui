<template>
  <v-card
    class="mx-auto mt-3 pa-6 pt-2"
    width="500"
  >
    <v-card-title
      class="mb-4 text-h5 font-weight-bold text-center"
    >
      {{ $t('menu.SETTINGS') }}
    </v-card-title>

    <v-row
      class="mt-10"
    >
      <v-spacer></v-spacer>
      <v-btn
        variant="text"
        color="pale"
        size="small"
        :to="{ name: 'accounts.delete' }"
      >
        {{ $t('menu.DELETE_ACCOUNT') }}
      </v-btn>
    </v-row>

  </v-card>
</template>
