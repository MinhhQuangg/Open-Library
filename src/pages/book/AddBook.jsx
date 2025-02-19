import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { MUIButton } from "../../components/common/Button/MUIButton";
import { VisuallyHiddenInput } from "../../components/common/HiddenInput/MUIHiddenInput";
import { MUITextField } from "../../components/common/TextField/MUITextField";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../services/User.service";
import { MUILoadingButton } from "../../components/common/Button/LoadingButton";
import { showToastError, showToastSuccess } from "../../components/ShowToast";

export const AddBook = () => {
  const form = useForm();
  const { register, control, handleSubmit, formState, setValue, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    document.title = "AddBook | Library";
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload) => {
      await UserService.uploadBook(payload);
      if (true) {
        reset();
      }
    },
    onSuccess: () => {
      showToastSuccess("Upload book success");
      reset();
    },
    onError: () => {
      showToastError("Upload book fail");
    },
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

  const uploadFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString().split(",")[1];
      setValue("image", base64String);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F0F0F0" }}>
      <NavBar />
      <Box
        margin=" 50px auto"
        sx={{
          width: "1250px",
          backgroundColor: "white",
        }}
        padding=" 30px 20px"
        borderRadius="10px"
      >
        <Typography fontSize="35px" fontWeight="bold">
          Add New Book
        </Typography>
        <Box fontSize="20px" display="flex" marginBottom="30px">
          Please enter the following form.
          <Typography color="red">&nbsp;* </Typography>
          Denoted mandatory information.
        </Box>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={5} alignContent="center">
              <Box justifyContent="flex-end" fontWeight="bold" display="flex">
                Title
                <Typography color="red">*</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <MUITextField
                {...register("title", {
                  required: { value: true, message: "required information" },
                })}
              />
              <Box color="red">{errors.Title?.message}</Box>
            </Grid>
            <Grid item xs={5} alignContent="center">
              <Box justifyContent="flex-end" fontWeight="bold" display="flex">
                Image
                <Typography color="red">*</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="image"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "required information",
                  },
                }}
                render={() => (
                  <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload File
                    <VisuallyHiddenInput type="file" onChange={uploadFile} />
                  </Button>
                )}
              />

              <Box color="red">{errors.Upload?.message}</Box>
            </Grid>
            <Grid item xs={5} alignContent="center">
              <Box justifyContent="flex-end" fontWeight="bold" display="flex">
                Author
                <Typography color="red">*</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <MUITextField
                {...register("author", {
                  required: { value: true, message: "required information" },
                })}
              />
              {errors.Author ? (
                <Box color="red">{errors.Author?.message}</Box>
              ) : (
                <Box fontSize="12px">
                  Separate by comma: "Agatha Christie, Jean-Paul Sartre"
                </Box>
              )}
            </Grid>
            <Grid item xs={5} alignContent="center">
              <Box justifyContent="flex-end" fontWeight="bold" display="flex">
                Publisher
              </Box>
            </Grid>
            <Grid item xs={4}>
              <MUITextField {...register("Publisher")} />
              <Box color="red">{errors.Publisher?.message}</Box>
            </Grid>
            <Grid item xs={5} alignContent="center">
              <Box justifyContent="flex-end" fontWeight="bold" display="flex">
                Publication Date
              </Box>
            </Grid>
            <Grid item xs={4}>
              <TextField size="small" type="date" {...register("Date")} />
              <Box color="red">{errors.Date?.message}</Box>
            </Grid>
            <Grid item xs={5} alignContent="center">
              <Box justifyContent="flex-end" fontWeight="bold" display="flex">
                Genres
              </Box>
            </Grid>
            <Grid item xs={4}>
              <MUITextField {...register("genres")} />
            </Grid>
            <Grid item xs={5} alignContent="center">
              <Box justifyContent="flex-end" fontWeight="bold" display="flex">
                ISBN
              </Box>
            </Grid>
            <Grid item xs={4}>
              <MUITextField type="number" {...register("ISBN")} />
            </Grid>
          </Grid>
          <Box textAlign="center" margin="30px 0 30px 0">
            {!isPending && (
              <MUIButton onClick={handleSubmit(onSubmit)}>Add Book</MUIButton>
            )}
            {isPending && <MUILoadingButton>Add Book</MUILoadingButton>}
          </Box>
        </form>
      </Box>
      <Footer />
    </Box>
  );
};
