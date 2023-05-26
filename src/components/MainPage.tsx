import { CardMedia } from "@mui/material";

const image = [
  {
    title: "School",
    imgSrc:
      "https://img.freepik.com/premium-vector/school-education-building-street-outdoor-landscape-cartoon-illustration_7081-1943.jpg?w=2000",
  },
];

const MainPage: React.FC = () => {
  const { imgSrc } = image[0];
  return (
    <>
      <CardMedia
        style={{ height: "100px" }}
        className="card-image"
        image={imgSrc}
      />
    </>
  );
};

export default MainPage;
