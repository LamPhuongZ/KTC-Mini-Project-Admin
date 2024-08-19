import * as Yup from "yup";
import dayjs from "dayjs";
import ButtonUI from "../../../components/Button";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DatePicker,
  Upload,
  InputNumber,
  Switch,
  Form,
  Row,
  Col,
  Input,
  Space,
} from "antd";
import {
  getMovieInfoAPI,
  updateMoiveAPI,
} from "../../../redux/services/movieAPI";

function EditMovieManagement() {
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const { maPhim } = useParams();

  const validationSchema = Yup.object({
    maPhim: Yup.string().required("Mã Phim là bắt buộc"),
    tenPhim: Yup.string().required("Tên Phim là bắt buộc"),
    biDanh: Yup.string().required("Bí Danh là bắt buộc"),
    trailer: Yup.string().required("Trailer là bắt buộc"),
    moTa: Yup.string().required("Mô Tả là bắt buộc"),
    maNhom: Yup.string().required("Mã Nhóm là bắt buộc"),
    ngayKhoiChieu: Yup.date().required("Ngày Khởi Chiếu là bắt buộc"),
    danhGia: Yup.number().required("Đánh Giá là bắt buộc"),
    hot: Yup.boolean(),
    dangChieu: Yup.boolean(),
    sapChieu: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      trailer: "",
      hinhAnh: "",
      moTa: "",
      maNhom: "",
      ngayKhoiChieu: "01/01/1998",
      danhGia: 0,
      hot: false,
      dangChieu: false,
      sapChieu: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!fileList.length) {
        toast.warning("Vui lòng chọn hình ảnh");
        return;
      }
      const payload = {
        ...values,
        hinhAnh: fileList[0]?.originFileObj || fileList[0]?.url,
      };
      try {
        await updateMoiveAPI(payload);
        toast.success("Cập nhật phim thành công");
        navigate("/movie-management");
      } catch (error) {
        toast.error("Cập nhật phim không thành công");
        throw error;
      }
    },
  });

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const data = await getMovieInfoAPI(maPhim);
        formik.setValues({
          maPhim: data.maPhim,
          tenPhim: data.tenPhim,
          biDanh: data.biDanh,
          trailer: data.trailer,
          hinhAnh: data.hinhAnh,
          moTa: data.moTa,
          maNhom: data.maNhom,
          ngayKhoiChieu: dayjs(data.ngayKhoiChieu, "DD/MM/YYYY"),
          danhGia: data.danhGia,
          hot: data.hot,
          dangChieu: data.dangChieu,
          sapChieu: data.sapChieu,
        });
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: data.hinhAnh,
          },
        ]);
      } catch (error) {
        toast.error("Thông tin phim không thể truy cập");
        throw error;
      }
    };
    fetchMovieInfo();
  }, [maPhim]);

  return (
    <>
      <h4 className="text-center mb-6 text-lg font-bold">Update Movie</h4>

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

export default EditMovieManagement;
