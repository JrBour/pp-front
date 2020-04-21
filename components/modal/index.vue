<template>
  <div class="modal__background">
    <div class="modal__wrapper">
      <p>{{ text }}</p>
      <div class="modal__action">
        <button class="modal__action_cancel" @click="cancel">Annuler</button>
        <button class="modal__action_confirm" @click="confirm">
          Confirmer
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="scss" scoped>
.modal__background {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($color: #3750b2, $alpha: 0.4);
  z-index: 99;
}
.modal__wrapper {
  width: 90%;
  border-radius: 5px;
  background: #fff;
  padding: 30px;
  & p {
    text-align: center;
    margin-bottom: 4vh;
  }
}
.modal__action {
  display: flex;
  justify-content: space-between;
}
.modal__action_cancel,
.modal__action_confirm {
  width: 45%;
  padding: 10px 0;
  border-radius: 10px;
}
.modal__action_cancel {
  color: #ff0000;
  border: 2px solid #ff0000;
  background: transparent;
}
.modal__action_confirm {
  color: #fff;
  background: #3750b2;
  border: none;
}
</style>
