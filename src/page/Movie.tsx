import AddIcon from "@mui/icons-material/Add";
import CollectionsIcon from "@mui/icons-material/Collections";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MoviePage = () => {
  const [searchParams] = useSearchParams();
  const imdbID = searchParams.get("imdbID");
  const [movieFromApi, setMovieFromApi] = useState<any>();

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=ec779d97&i=${imdbID}`)
      .then((response) => response.json())
      .then((res) => {
        setMovieFromApi(res);
      });
  }, []);

  return (
    <>
      {movieFromApi == null ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -75%)",
          }}
        >
          <CircularProgress size={110} color="warning" />
        </Box>
      ) : (
        <Container maxWidth={"lg"}>
          <Box sx={{ display: "flex", pt: 2, pb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3">{movieFromApi.Title}</Typography>
              <Typography pt={1} variant="body2">
                {movieFromApi.Year} &middot; {movieFromApi.Rated} &middot;{" "}
                {movieFromApi.Runtime}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ pl: 2, pt: 2 }}>
                <Typography variant="body1">IMDb RATING</Typography>
                <Typography variant="h6" display={"flex"}>
                  <StarIcon
                    color="warning"
                    sx={{ fontSize: 30, marginRight: 0.5 }}
                  />
                  {movieFromApi.imdbRating} /10
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Card sx={{ flex: "1 0 200px" }}>
              <CardMedia component="img" image={movieFromApi.Poster} />
            </Card>
            <Box sx={{ flex: "5 0 400px" }}>
              <Box
                sx={{
                  backgroundImage: `url(${movieFromApi.Poster})`,
                  backgroundColor: "black",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  position: "relative",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    borderRadius: 2,
                  }}
                ></Box>
                <Box
                  sx={{ display: "flex", alignItems: "end", height: "100%" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton>
                      <PlayCircleOutlineIcon
                        color="warning"
                        sx={{ fontSize: 100 }}
                      />
                    </IconButton>
                    <Typography color={"white"} variant="h5">
                      Play
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                flex: "1 0 150px",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <IconButton
                sx={{
                  flex: 1,
                  borderRadius: 1,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              >
                <Box>
                  <CollectionsIcon fontSize="large" />
                  <Typography variant="body2">PHOTO</Typography>
                </Box>
              </IconButton>
              <IconButton
                sx={{
                  flex: 1,
                  borderRadius: 1,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              >
                <Box>
                  <VideoLibraryIcon fontSize="large" />
                  <Typography variant="body2">VIDEOS</Typography>
                </Box>
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", pt: 2, pb: 2 }}>
            <Box sx={{ flex: "3 0 400px" }}>
              {movieFromApi.Genre.split(",").map(
                (genre: any, index: number) => (
                  <Button
                    key={index}
                    size="small"
                    color="inherit"
                    variant="outlined"
                    sx={{ borderRadius: 100, marginRight: 1 }}
                  >
                    {genre}
                  </Button>
                )
              )}
              <Box pr={2} pt={2}>
                <Typography variant="body1">{movieFromApi.Plot}</Typography>
                <Divider sx={{ mt: 2, mb: 2 }} />
                {movieFromApi.Director === "N/A" ? null : (
                  <Box>
                    <Typography variant="body1">
                      Director &middot;{" "}
                      {movieFromApi.Director.split(",").map(
                        (director: any, index: number) => (
                          <Button
                            key={index}
                            size="small"
                            color="warning"
                            variant="outlined"
                            sx={{ borderRadius: 100, marginRight: 1 }}
                          >
                            {director}
                          </Button>
                        )
                      )}
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                  </Box>
                )}
                {movieFromApi.Writer === "N/A" ? null : (
                  <Box>
                    <Typography variant="body1">
                      Writer &middot;{" "}
                      {movieFromApi.Writer.split(",").map(
                        (writer: any, index: number) => (
                          <Button
                            key={index}
                            size="small"
                            color="warning"
                            variant="outlined"
                            sx={{ borderRadius: 100, marginRight: 1 }}
                          >
                            {writer}
                          </Button>
                        )
                      )}
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                  </Box>
                )}
                {movieFromApi.Actors === "N/A" ? null : (
                  <Box>
                    <Typography variant="body1">
                      Actors &middot;{" "}
                      {movieFromApi.Actors.split(",").map(
                        (actors: any, index: number) => (
                          <Button
                            key={index}
                            size="small"
                            color="warning"
                            variant="outlined"
                            sx={{ borderRadius: 100, marginRight: 1 }}
                          >
                            {actors}
                          </Button>
                        )
                      )}
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              sx={{ flex: "1 0 200px", display: "flex", alignItems: "center" }}
            >
              <Box width={"100%"}>
                <Button
                  color="warning"
                  startIcon={<AddIcon />}
                  variant="contained"
                  sx={{ borderRadius: 2, marginRight: 1, height: 50 }}
                  fullWidth
                >
                  ADD TO LIST
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default MoviePage;
