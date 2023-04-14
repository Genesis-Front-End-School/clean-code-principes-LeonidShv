<template>
  <main>
    <h1 class="title">Components</h1>

    <div>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Components" />
        <q-breadcrumbs-el label="Breadcrumbs" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md q-gutter-sm">
      <q-btn
        color="white"
        text-color="black"
        label="Standard"
      />
    </div>

    <div style="width: 300px">
      <q-select
        v-model="select"
        :options="options"
        label="Standard"
      />
      {{ select }}
    </div>

    <div>
      <q-checkbox v-model="isCheckbox" />
    </div>

    <div>
      <q-pagination
        v-model="pagination"
        color="purple"
        :max="10"
        :max-pages="6"
        boundary-numbers
        direction-links
      />
    </div>

    <div>
      <q-rating
        v-model="ratingModel"
        size="2em"
        :max="5"
        color="yellow-6"
        icon-half="star_half"
      />
    </div>

    <div>
      <q-inner-loading
        :showing="false"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </div>

    <div>
      <q-toggle
        v-model="toggle"
        checked-icon="check"
        color="red"
        label="Different icon for each state"
        unchecked-icon="clear"
      />
    </div>

    <div>
      <q-input
        v-model="textarea"
        filled
        type="textarea"
      />
    </div>

    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar4.jpg"
        :text="['hey, how are you?']"
        sent
        stamp="7 minutes ago"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="[`doing fine, how r you?`]"
        stamp="4 minutes ago"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// import { useQuasar } from 'quasar'
// const $q = useQuasar()

// function showNotification () {
//   $q.notify({
//     message: 'Jim pinged you.',
//     color: 'purple'
//   })
// }

const select = ref(null)
const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']

const isCheckbox = ref(false)

const pagination = ref(1)

const ratingModel = ref(4.5)

const toggle = ref(false)

const textarea = ref('')
</script>
