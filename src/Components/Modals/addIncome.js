import { DatePicker, Form, Input, Modal, Select } from "antd";
import React from "react";
import Button from "../Button";

const AddIncomeModal=({isIncomeModalVisible,handleIncomeCancel,onFinish})=>{

    const [form]=Form.useForm();
    return(
        <div>
            <Modal
             visible={isIncomeModalVisible}
             onCancel={handleIncomeCancel}
             title="Add Income"
             footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values)=>{
                        onFinish(values,"income");
                        form.resetFields();
                    }}
                    >
                        <Form.Item
                            label='Name'
                            name="name"
                            rules={[
                                {
                                    required:true,
                                    message:"Please input the name of the transaction!"
                                },
                            ]}
                        >
                            <Input type="text" className="custom-input"/>
                        </Form.Item>
                        <Form.Item
                            label='Amount'
                            name="amount"
                            rules={[
                                {
                                    required:true,
                                    message:"Please input the income amount!"
                                },
                            ]}
                        >
                            <Input type="number" className="custom-input"/>
                        </Form.Item>
                        <Form.Item
                            label='Date'
                            name="date"
                            rules={[
                                {
                                    required:true,
                                    message:"Please select the income date!"
                                },
                            ]}
                        >
                            <DatePicker format="YYYY-MM-DD" className="custom-input"/>
                        </Form.Item>
                        <Form.Item
                            label='Tag'
                            name="tag"
                            rules={[
                                {
                                    required:true,
                                    message:"Please select a tag!"
                                },
                            ]}
                        >
                            <Select className="select-input-2">
                                <Select.Option value="salary">Salary</Select.Option>
                                <Select.Option value="freelance">Freelance</Select.Option>
                                <Select.Option value="investment">Investment</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button text="Add Income" blue={true}/>
                        </Form.Item>
                    </Form>
            </Modal>
        </div>
    )
}

export default AddIncomeModal;