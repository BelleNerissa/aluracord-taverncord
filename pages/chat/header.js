import { Box, Button, Image, Text } from "@skynexui/components";

export default function Header(props) {
    return (
      <>
        <Box
          styleSheet={{
            width: "100%",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text variant="heading3">Chat - TavernCord</Text>
          <Image
            styleSheet={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
              marginLeft: "auto",
              marginRight: "10px"
            }}
            src={`https://github.com/${props.user}.png`}
          />
          <Button
            variant="tertiary"
            iconName="arrowRight"
            colorVariant="light"
            label="Sair"
            size="lg"
            href="/"
          />
        </Box>
      </>
    );
  }