<template>
  <div class="expense__wrapper">
    <button v-if="canRemoveExpense" @click="removeExpense"><p>x</p></button>
    <div class="expense__date">
      <p class="expense__date_day">{{ shortDays[start.getDay()] }}</p>
      <p class="expense__date_date">{{ start.getDate() }}</p>
      <p class="expense__date_month">{{ shortMonths[start.getMonth()] }}</p>
    </div>
    <div class="expense__separator"></div>
    <div class="expense__informations_wrapper">
      <div class="expense__informations">
        <h3>{{ expense.name }}</h3>
        <p>{{ expense.user.givenName }} {{ expense.user.lastName }}</p>
      </div>
      <div class="expense__amount">
        <p>{{ amount }} €</p>
      </div>
    </div>
  </div>
</template>
<script>
import { shortDays, shortMonths } from '~/constants/date'

export default {
  name: 'Expense',
  props: {
    expense: {
      required: true,
      type: Object
    },
    canRemoveExpense: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    shortDays,
    shortMonths
  }),
  computed: {
    amount() {
      const amount = this.expense.amount.toString().split('.')
      if (amount.length > 1) {
        if (amount[1].length === 1) {
          return `${this.expense.amount}0`
        } else {
          return this.expense.amount
        }
      } else {
        return `${this.expense.amount}.00`
      }
    },
    start() {
      return new Date(this.expense.createdAt)
    }
  },
  methods: {
    removeExpense() {
      this.$emit('remove-expense', this.expense.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.expense__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  margin-bottom: 3vh;
  height: 9vh;
  width: 95%;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  padding: 10px;
}
button {
  position: absolute;
  top: -0.5em;
  right: -0.5em;
  height: 1.5em;
  width: 1.5em;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fd5c63;
  color: white;
  border: none;
}
.expense__informations_wrapper {
  display: flex;
  width: 85%;
  align-items: center;
}
.expense__informations {
  width: 75%;
}
.expense__date {
  text-align: center;
  line-height: 1.1em;
}
.expense__date_day {
  font-size: 0.8em;
  color: #7c7c7c;
}
.expense__date_date {
  font-weight: 500;
  font-size: 1.2em;
  color: #000;
}
.expense__date_month {
  font-size: 0.8em;
  color: #47588a;
  line-height: 1.1em;
}
.expense__separator {
  height: 5vh;
  width: 1px;
  margin: 0 2vw;
  background: rgba(139, 137, 137, 0.5);
}
.expense__informations {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  & h3 {
    font-size: 1em;
    color: #3750b2;
    font-weight: 500;
  }
  & p {
    font-size: 0.8em;
  }
}
.expense__amount {
  font-size: 1.3em;
  color: #3750b2;
  width: 40%;
  text-align: right;
}
</style>
