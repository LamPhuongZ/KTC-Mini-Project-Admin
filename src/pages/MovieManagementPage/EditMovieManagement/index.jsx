import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { movieValidationSchema } from "../../../utils/validations";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMovieByIdAPI,
  updateMovieAPI,
} from "../../../redux/services/movieAPI";
import {
  DatePicker,
  Upload,
  InputNumber,
  Form,
  Row,
  Col,
  Input,
  Space,
} from "antd";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import ButtonUI from "../../../components/button";

function EditMovieManagement() {
  const [componentSize, setComponentSize] = useState("default");
  const [fileList, setFileList] = useState([]);
  const { movieId } = useParams();
  const navigate = useNavigate();

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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidationSchema),
    defaultValues: {
      name: "",
      description: "",
      releaseDate: moment().format("YYYY-MM-DD"),
      cast: "",
      trailer: "",
      image: [],
      rating: 0,
    },
  });

  const onSubmit = async (values) => {
    if (!fileList.length) {
      toast.warning("Please select an image");
      return;
    }
    const payload = {
      ...values,
      releaseDate: moment(values.releaseDate).format("YYYY-MM-DD"),
      image: fileList[0]?.originFileObj || fileList[0]?.url,
    };

    console.log(payload);

    try {
      const response = await updateMovieAPI(movieId, payload);

      console.log("Update: ", response);

      toast.success("Movie update successful");
      reset();
      navigate("/movie-management");
    } catch (error) {
      toast.error("Movie update failed");
      throw error;
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieByIdAPI(movieId);
        const releaseDate = response.data.releaseDate
          ? moment(response.data.releaseDate, "YYYY-MM-DD")
          : moment();

        // update data into input box
        setValue("name", response.data.name),
          setValue("description", response.data.description),
          setValue("trailer", response.data.trailer),
          setValue("image", response.data.imageUrl),
          setValue("cast", response.data.cast),
          setValue("releaseDate", releaseDate._i),
          setValue("rating", response.data.rating),
          setFileList([
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: response.data.imageUrl,
            },
          ]);
      } catch (error) {
        toast.error("Movie information not accessible");
        throw error;
      }
    };
    fetchMovie();
  }, []);

  return (
    <section className="flex flex-col w-full justify-center items-center">
      <h4 className="text-center mb-6 text-lg font-bold">Update Movie</h4>
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
                render={({ field }) => {
                  return (
                    <Upload
                      action="/upload.do"
                      {...field}
                      onChange={({ fileList: newFileList }) => {
                        setFileList(newFileList);
                      }}
                      fileList={fileList}
                      listType="picture-card"
                    >
                      <div>
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </div>
                    </Upload>
                  );
                }}
                rules={{
                  required: true,
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
                render={({ field: { onChange, value } }) => (
                  <Space direction="vertical" size={12}>
                    <DatePicker
                      format="YYYY-MM-DD"
                      onChange={(date) => onChange(date ? date : null)}
                      value={value ? moment(value) : null}
                    />
                  </Space>
                )}
                rules={{ required: true }}
              />
              {errors.releaseDate && (
                <p className="text-red-500 mb-4">
                  {errors.releaseDate.message}
                </p>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Rating">
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

        <Form.Item>
          <ButtonUI type="submit" title="Update movie" />
        </Form.Item>
      </Form>
    </section>
  );
}

export default EditMovieManagement;
