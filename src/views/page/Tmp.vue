<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Activity name" v-bind="validateInfos.name">
      <a-input v-model:value="modelRef.name" defaultValue="111" />
    </a-form-item>
    <a-form-item label="Activity zone" v-bind="validateInfos.region">
      <a-select v-model:value="modelRef.region" placeholder="please select your zone">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Activity type" v-bind="validateInfos.type">
      <a-checkbox-group v-model:value="modelRef.type">
        <a-checkbox value="1" name="type">Online</a-checkbox>
        <a-checkbox value="2" name="type">Promotion</a-checkbox>
        <a-checkbox value="3" name="type">Offline</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="reset">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
const useForm = Form.useForm;
export default defineComponent({
  setup() {
    const modelRef = reactive({
      name: '',
      region: undefined,
      type: [],
    });
    const rulesRef = reactive({
      name: [{
        required: true,
        message: 'Please input name',
      }],
      region: [{
        required: true,
        message: 'Please select region',
      }],
      type: [{
        required: true,
        message: 'Please select type',
        type: 'array',
      }],
    });
    const {
      resetFields,
      validate,
      validateInfos,
      initialModel
    } = useForm(modelRef, rulesRef, {
      // onValidate: (...args) => console.log(...args),
    });
    function reset () {
      resetFields()
      // resetFields({
      //   name: 1
      // })
    }
    const onSubmit = () => {
      validate().then(() => {
        console.log(toRaw(modelRef));
      }).catch(err => {
        console.log('error', err);
      });
    };
    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
      reset
    };
  },
});
</script>