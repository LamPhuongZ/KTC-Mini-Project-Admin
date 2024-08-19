import dayjs from "dayjs";
import ButtonUI from "../../../components/Button";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Switch,
  Upload,
  Row,
  Col,
  Space,
} from "antd";

function CreateMovieManagement() {
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      biDanh: "",
      trailer: "",
      hinhAnh: "",
      moTa: "",
      ngayKhoiChieu: "",
      danhGia: 0,
      hot: false,
      dangChieu: false,
      sapChieu: false,
    },
    onSubmit: async (values) => {
      try {
        // Xử lý gửi dữ liệu
        toast.success("Thêm phim thành công");
      } catch (error) {
        toast.error("Thêm phim không thành công");
        throw error;
      }
    },
  });

  return (
    <>
      <h4 className="text-center mb-6 text-lg font-bold">Add Movie</h4>

      <Form
        layout="horizontal"
        onFinish={formik.handleSubmit}
        style={{ maxWidth: 800, margin: "auto" }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tên Phim">
              <Input
                name="tenPhim"
                value={formik.values.tenPhim}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Bí Danh">
              <Input
                name="biDanh"
                value={formik.values.biDanh}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Trailer">
              <Input
                name="trailer"
                value={formik.values.trailer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Hình Ảnh"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload
                name="hinhAnh"
                listType="picture-card"
                onChange={(info) =>
                  formik.setFieldValue("hinhAnh", info.fileList)
                }
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Mô tả">
              <Input.TextArea
                name="moTa"
                value={formik.values.moTa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Ngày Khởi Chiếu">
            <Space direction="vertical" size={12}>
                <DatePicker
                  format="DD/MM/YYYY"
                  name="ngayKhoiChieu"
                  onChange={(date, dateString) =>
                    formik.setFieldValue("ngayKhoiChieu", dateString)
                  }
                  value={
                    formik.values.ngayKhoiChieu
                      ? dayjs(formik.values.ngayKhoiChieu, "DD/MM/YYYY")
                      : null
                  }
                />
              </Space>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Đánh Giá">
              <InputNumber
                name="danhGia"
                value={formik.values.danhGia}
                onChange={(value) => formik.setFieldValue("danhGia", value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Hot" valuePropName="checked">
              <Switch
                name="hot"
                checked={formik.values.hot}
                onChange={(checked) => formik.setFieldValue("hot", checked)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Đang Chiếu" valuePropName="checked">
              <Switch
                name="dangChieu"
                checked={formik.values.dangChieu}
                onChange={(checked) =>
                  formik.setFieldValue("dangChieu", checked)
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Sắp Chiếu" valuePropName="checked">
              <Switch
                name="sapChieu"
                checked={formik.values.sapChieu}
                onChange={(checked) =>
                  formik.setFieldValue("sapChieu", checked)
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <ButtonUI type="submit" title="Thêm Phim" />
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateMovieManagement;
