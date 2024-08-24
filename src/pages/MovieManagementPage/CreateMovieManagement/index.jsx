import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import ButtonUI from "../../../components/button";
import { toast } from "react-toastify";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { PlusOutlined } from "@ant-design/icons";
import { createMovieAPI } from "../../../redux/services/movieAPI";
import { useForm, Controller } from "react-hook-form";
import { movieValidationSchema } from "../../../utils/validations";
import {
  Form,
  Input,
  DatePicker,
  Upload,
  Row,
  Col,
  Space,
  InputNumber,
} from "antd";

function CreateMovieManagement() {
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList || [];
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidationSchema),
    defaultValues: {
      name: "",
      description: "",
      releaseDate: null,
      cast: "",
      trailer: "",
      image: [],
      rating: 0,
    },
  });

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      releaseDate: values.releaseDate
        ? moment(values.releaseDate).format("YYYY-MM-DD")
        : null,
      image:
        values.image && values.image.length > 0
          ? values.image[0].originFileObj
          : null,
    };

    console.log(payload, "payload");

    try {
      const response = await createMovieAPI(payload);

      console.log(response);

      toast.success("Add movie successfully");
      reset();
      navigator("/movie-management")
    } catch (error) {
      console.error("API call failed", error);
      toast.error("Add movie failed");
    }
  };

  return (
    <section className="flex flex-col w-full justify-center items-center">
      <h4 className="text-center mb-6 text-lg font-bold">Add Movie</h4>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
          paddingLeft: "100px",
        }}
        onFinish={handleSubmit(onSubmit)}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Name">
              <Controller
                name="name"
                control={control}
                render={({ onChange, field }) => {
                  return <Input onChange={onChange} {...field} />;
                }}
                rules={{
                  required: true,
                }}
              />
              {errors.name && (
                <p className="text-red-500 mb-4">{errors.name.message}</p>
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Upload
                    beforeUpload={() => false}
                    onChange={(info) => {
                      onChange(info.fileList);
                    }}
                    fileList={value || []}
                    listType="picture-card"
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                )}
                rules={{
                  required: "Image is required",
                }}
              />
              {errors.image && (
                <p className="text-red-500 mb-4">{errors.image.message}</p>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Trailer">
              <Controller
                name="trailer"
                control={control}
                render={({ onChange, field }) => {
                  return <Input onChange={onChange} {...field} />;
                }}
                rules={{
                  required: true,
                }}
              />
              {errors.trailer && (
                <p className="text-red-500 mb-4">{errors.trailer.message}</p>
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Cast">
              <Controller
                name="cast"
                control={control}
                render={({ onChange, field }) => {
                  return <Input onChange={onChange} {...field} />;
                }}
                rules={{
                  required: true,
                }}
              />
              {errors.cast && (
                <p className="text-red-500 mb-4">{errors.cast.message}</p>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Description">
              <Controller
                name="description"
                control={control}
                render={({ onChange, field }) => {
                  return (
                    <TextArea
                      showCount
                      rows={8}
                      onChange={onChange}
                      {...field}
                    />
                  );
                }}
                rules={{
                  required: true,
                }}
              />
              {errors.description && (
                <p className="text-red-500 mb-4">
                  {errors.description.message}
                </p>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Release Date"
              labelCol={{
                style: {
                  marginRight: 5,
                },
              }}
              rules={{
                required: true,
              }}
            >
              <Controller
                name="releaseDate"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Space direction="vertical" size={12}>
                      <DatePicker
                        format="YYYY-MM-DD"
                        onChange={(date) => onChange(date)}
                        value={value ? moment(value) : null}
                      />
                    </Space>
                  );
                }}
                rules={{
                  required: true,
                }}
              />
              {errors.releaseDate && (
                <p className="text-red-500 mb-4">
                  {errors.releaseDate.message}
                </p>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Rate">
              <Controller
                name="rating"
                control={control}
                render={({ onChange, field }) => {
                  return <InputNumber onChange={onChange} {...field} />;
                }}
              />
              {errors.rating && (
                <p className="text-red-500 mb-4">{errors.rating.message}</p>
              )}
            </Form.Item>
          </Col>
        </Row>
        <ButtonUI type="submit" title="Add Movie" />
      </Form>
    </section>
  );
}

export default CreateMovieManagement;
