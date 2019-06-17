// import React from "react";
// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: "flex"
//     },
//     formControl: {
//       margin: theme.spacing(3)
//     },
//     group: {
//       margin: theme.spacing(1, 0)
//     }
//   })
// );

// export default function RadioButtonsGroup() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState("female");

//   function handleChange(event: React.ChangeEvent<unknown>) {
//     setValue((event.target as HTMLInputElement).value);
//   }

//   return (
//     <div className={classes.root}>
//       <FormControl component="fieldset" className={classes.formControl}>
//         <FormLabel component="legend">Gender</FormLabel>
//         <RadioGroup
//           aria-label="gender"
//           name="gender2"
//           className={classes.group}
//           value={value}
//           onChange={handleChange}
//         >
//           <FormControlLabel
//             value="female"
//             control={<Radio color="primary" />}
//             label="Female"
//             labelPlacement="start"
//           />
//           <FormControlLabel
//             value="male"
//             control={<Radio color="primary" />}
//             label="Male"
//             labelPlacement="start"
//           />
//         </RadioGroup>
//       </FormControl>
//     </div>
//   );
// }
