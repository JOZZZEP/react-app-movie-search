import { Component, createContext, ReactNode, useContext } from "react";

interface MovieContextType {
  page: number;
  setPage: (page: number) => void;
  searchWord: string;
  setSearchWord: (word: string) => void;
  searchOption: number;
  setSearchOption: (searchOption: number) => void;
  type: number;
  setType: (type: number) => void;
}

const MovieContext = createContext<MovieContextType>({
  page: 1,
  setPage: () => {},
  searchWord: "",
  setSearchWord: () => {},
  searchOption: 1,
  setSearchOption: () => {},
  type: 1,
  setType: () => {},
});

export default class MovieContextProvider extends Component<
  { children: ReactNode },
  { page: number; searchWord: string; searchOption: number; type: number }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      page: 1,
      searchWord: "",
      searchOption: 1,
      type: 1,
    };
  }

  setPage = (page: number) => {
    this.setState({ page });
  };

  setSearchWord = (searchWord: string) => {
    this.setState({ searchWord });
  };

  setSearchOption = (searchOption: number) => {
    this.setState({ searchOption });
  };

  setType = (type: number) => {
    this.setState({ type });
  };

  render() {
    const contextValues = {
      page: this.state.page,
      setPage: this.setPage,
      searchWord: this.state.searchWord,
      setSearchWord: this.setSearchWord,
      searchOption: this.state.searchOption,
      setSearchOption: this.setSearchOption,
      type: this.state.type,
      setType: this.setType,
    };

    return (
      <MovieContext.Provider value={contextValues}>
        {this.props.children}
      </MovieContext.Provider>
    );
  }
}

export const useMovieContext = () => useContext(MovieContext);
