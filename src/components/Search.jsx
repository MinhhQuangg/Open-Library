import {
  Box,
  Button,
  Grid,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
// import iconSearch from "assets/images/icon-search.png";
// import iconSearchAdvance from "assets/icon/icon-search-advance.png";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useEffect, useRef, useState } from "react";

// type TSearch = {
//   name?: string,
//   hasSearchAdvance?: boolean,
//   onSubmit: SubmitHandler<any>,
//   formContext: UseFormReturn<any>,
//   childrenSearchAdvance?: JSX.Element | ReactNode,
// };

export const Search = (props) => {
  const [object, setObject] = useState({
    query: "",
    lastQuery: "",
    canSearch: true,
  });
  const { query = "", lastQuery = "", canSearch = true } = object;
  const { t } = useTranslation();
  const formContext = useForm();
  const {
    onSubmit = () => {},
    hasSearchAdvance = true,
    name = "keySearch",
    childrenSearchAdvance,
  } = props;

  const { setValue, getValues, reset, handleSubmit } = formContext;

  const spanRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  const handleClick = () => {
    setAnchorEl(spanRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onRefresh = useCallback(() => {
    const valueSearch = getValues(name);
    reset();
    setValue(name, valueSearch);
  }, []);

  useEffect(() => {
    if (!canSearch) {
      const timer = setTimeout(() => {
        setObject((prev) => ({ ...prev, canSearch: true }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [canSearch]);

  const handleSearch = () => {
    if (query === lastQuery && !canSearch) {
      return;
    }
    console.log("query", query);
    setObject((prev) => ({ ...prev, lastQuery: query }));
    setObject((prev) => ({ ...prev, canSearch: false }));
  };
  console.log("1");
  return (
    <div ref={spanRef}>
      <TextField
        value={query}
        size="small"
        name={name}
        onChange={(e) =>
          setObject((prev) => ({ ...prev, query: e.target.value }))
        }
        placeholder={t("button.search")}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
          }
        }}
        InputProps={{
          // disableUnderline: true,
          sx: { background: "white" },
          endAdornment: (
            <Box>
              <Grid container flexDirection="row" flexWrap="nowrap">
                <Grid item>
                  <Box style={styleIconSearch}>
                    {/* <img
                      onClick={onSubmit}
                      src={iconSearch}
                      alt=""
                      style={{ width: "18px" }}
                    /> */}
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </Box>
                </Grid>
                {hasSearchAdvance && (
                  <Grid item>
                    <Box onClick={handleClick} style={styleIconSearch}>
                      {/* <img
                        src={iconSearchAdvance}
                        alt=""
                        style={{ width: "20px" }}
                      /> */}
                      {/* <SearchIcon /> */}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          ),
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box p={2} width="600px">
          <IconButton
            onClick={() => handleClose()}
            sx={{ position: "absolute", right: 10, top: 5, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography fontWeight={600}>Tìm kiếm nâng cao</Typography>
          <Box pt={2}>{childrenSearchAdvance}</Box>
          <Grid container justifyContent="flex-end" columnGap={1}>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={onRefresh}
              size="small"
            >
              Làm mới
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                handleClose();
                onSubmit(getValues());
              }}
              size="small"
            >
              {t("button.search")}
            </Button>
          </Grid>
        </Box>
      </Popover>
    </div>
  );
};

const styleIconSearch = {
  borderRadius: "4px",
  cursor: "pointer",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  width: "38px",
  height: "38px",
};
