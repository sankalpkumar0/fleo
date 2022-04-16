import { Divider, Typography } from "@mui/material";
import React from "react";
import DataTable from "./commonComponents/dataTable/dataTable";

function MyComponent() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch(
      "https://api.github.com/search/repositories?q=language:Javascript&sort=stars&order=desc"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Typography
          variant="h4"
          sx={{
            paddingBottom: "100px",
            paddingTop: "50px",
            paddingLeft: "700px",
            paddingRight: "100px",
          }}
        >
          List of Github Repositories
        </Typography>
        <Divider />
        <DataTable data={items} />;
      </>
    );
  }
}
export default MyComponent;
