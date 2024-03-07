import {
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";

const HomePage = () => {
  const [movieList, setMovieList] = useState<any[]>([]);
  const {
    page,
    setPage,
    searchWord,
    setSearchWord,
    searchOption,
    setSearchOption,
    type,
    setType,
  } = useMovieContext();
  const [allPage, setAllPage] = useState(1);
  const [response, setResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const theme = useTheme();

  useEffect(() => {
    if (searchWord !== "" && searchOption === 1) {
      fetch(
        `http://www.omdbapi.com/?apikey=ec779d97&s=${searchWord}&page=${page}&type=${
          type === 1 ? "" : type === 2 ? "movie" : "series"
        }`
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.Response == "True") {
            setAllPage(Math.floor(res.totalResults / 10 + 1));
            setMovieList(res.Search);
            setResponse(true);
          } else {
            setResponse(false);
            setMovieList([]);
          }
          setIsLoading(false);
        });
    } else if (searchWord !== "" && searchOption === 2) {
      fetch(`http://www.omdbapi.com/?apikey=ec779d97&i=${searchWord}`)
        .then((response) => response.json())
        .then((res) => {
          if (res.Response == "True") {
            setAllPage(1);
            setMovieList([res]);
            setResponse(true);
          } else {
            setResponse(false);
            setMovieList([]);
          }
          setIsLoading(false);
        });
    }
  }, [page, searchWord, type]);

  const pageChange = (page: number) => {
    setMovieList([]);
    setPage(page);
  };

  return (
    <>
      <Container maxWidth={"lg"}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            p: 1,
            position: "sticky",
            top: 0,
            right: 0,
            left: 0,
            zIndex: 999,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography variant="h4" sx={{ flexGrow: 2, fontWeight: "bold" }}>
            MOVIE SEARCH
          </Typography>
          <TextField
            placeholder={
              searchOption == 1
                ? "ชื่อภาพยนตร์ เช่น Squid Game "
                : "รหัส IMDb เช่น tt10919420 "
            }
            size="small"
            sx={{ flexGrow: 1 }}
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
              setResponse(true);
              setPage(1);
            }}
          ></TextField>
          <Select
            size="small"
            value={searchOption}
            onChange={(event) => {
              setSearchOption(+event.target.value);
              setSearchWord("");
              setResponse(true);
              setPage(1);
              setType(1);
              setMovieList([]);
            }}
            sx={{ flexGrow: 1 }}
          >
            <MenuItem value={1}>ค้นหาด้วยชื่อ</MenuItem>
            <MenuItem value={2}>ค้นหาด้วยรหัส IMDb</MenuItem>
          </Select>
          {searchOption == 1 ? (
            <Select
              size="small"
              value={type}
              onChange={(event) => {
                setType(+event.target.value);
                setPage(1);
              }}
              sx={{ flexGrow: 1 }}
            >
              <MenuItem value={1}>ประเภททั้งหมด</MenuItem>
              <MenuItem value={2}>ภาพยนตร์</MenuItem>
              <MenuItem value={3}>ซีรี่ย์</MenuItem>
            </Select>
          ) : null}
        </Box>
        {!isLoading && response && movieList.length !== 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: searchOption == 2 ? "start" : "center",
              gap: 1,
              p: 2,
              pb: 10,
            }}
          >
            {movieList.map((movie, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: "200px",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={movie.Poster}
                    onClick={() => {
                      navigate(`/movie/${movie.Title}?imdbID=${movie.imdbID}`);
                    }}
                  />
                </CardActionArea>
              </Card>
            ))}
          </Box>
        ) : searchWord == "" && movieList.length == 0 ? (
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
            <Typography variant="h4">ค้นหาภาพยนตร์</Typography>
          </Box>
        ) : !isLoading && !response && movieList.length == 0 ? (
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
            <Typography variant="h4">ไม่พบ</Typography>
          </Box>
        ) : (
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
        )}
        {movieList.length !== 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              position: "fixed",
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Pagination
              size="large"
              count={allPage}
              page={page}
              onChange={(_e, page) => pageChange(page)}
              showFirstButton
              showLastButton
            />
          </Box>
        ) : null}
      </Container>
    </>
  );
};

export default HomePage;
