import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import * as React from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "warning" | ""; // 可选类型
}

const AlertVariousStates: React.FC<AlertProps> = ({ message, type = "" }) => {
  const items = [
    { title: "Success", color: "success", icon: <CheckCircleIcon /> },
    { title: "Warning", color: "warning", icon: <WarningIcon /> },
    { title: "Error", color: "danger", icon: <ReportIcon /> },
    { title: "Neutral", color: "neutral", icon: <InfoIcon /> },
  ];

  const selectedItem = items.find((item) => item.color === type);

  if (!selectedItem) {
    return null; // 如果传入的type不匹配，返回null
  }

  return (
    <Box
      sx={{ display: "flex", gap: 2, width: "100%", flexDirection: "column" }}
    >
      <Alert
        key={selectedItem.title}
        sx={{ alignItems: "flex-start" }}
        startDecorator={selectedItem.icon}
        variant="soft"
        color={selectedItem.color}
        endDecorator={
          <IconButton variant="soft" color={selectedItem.color}>
            <CloseRoundedIcon />
          </IconButton>
        }
      >
        <div>
          <div>{selectedItem.title}</div>
          <Typography level="body-sm" color={selectedItem.color}>
            {message}
          </Typography>
        </div>
      </Alert>
    </Box>
  );
};

export default AlertVariousStates;
