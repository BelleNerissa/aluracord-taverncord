import React from "react";
import { Box, Button, Text, Image } from "@skynexui/components";
import appConfig from "../../config.json";

export function ButtonSendSticker(props) {
  const [isOpen, setOpenState] = React.useState("");

  return (
    <Box
      styleSheet={{
        position: "relative",
        marginRight: "15px",
      }}
    >
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/8/84/Twenty_sided_dice.svg"
        styleSheet={{
          borderRadius: "50%",
          padding: "0 3px 0 0",
          Width: "60px",
          Height: "50px",
          fontSize: "20px",
          marginBottom: "8px",
          lineHeight: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          filter: isOpen ? "grayscale(0)" : "grayscale(1)",
          hover: {
            filter: "grayscale(0)",
          },
        }}
        // label="😜"
        onClick={() => setOpenState(!isOpen)}
      />

      {isOpen && (
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            position: "absolute",
            backgroundColor: appConfig.theme.colors.neutrals[800],
            width: {
              xs: "200px",
              sm: "190px",
            },
            height: "300px",
            right: "30px",
            bottom: "30px",
            padding: "16px",
            boxShadow:
              "rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px",
          }}
          onClick={() => setOpenState(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: "bold",
            }}
          >
            Stickers
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: "flex",
              // flexWrap: "wrap",
              justifyContent: "space-between",
              flex: 1,
              paddingTop: "16px",
              overflowX: "hidden",
            }}
          >
            <div className="messageListBox">
              <style jsx>{`
                .messageListBox {
                  overflow: scroll;
                  overflow-x: hidden;
                }
                .messageListBox::-webkit-scrollbar {
                  width: 10px;
                }
                .messageListBox::-webkit-scrollbar-track {
                  // border-radius: 30px;
                  // background-image: url(https://i.pinimg.com/564x/73/67/6b/73676b570ef058ee041804bfa67d2170.jpg);
                }
                .messageListBox::-webkit-scrollbar-thumb {
                  border-radius: 10px;
                  background: ${appConfig.theme.colors.neutrals["000"]};
                }
              `}</style>
              {appConfig.stickers.map((sticker) => (
                <Text
                  onClick={() => {
                    // console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
                    if (Boolean(props.onStickerClick)) {
                      props.onStickerClick(sticker);
                    }
                  }}
                  tag="li"
                  key={sticker}
                  styleSheet={{
                    width: "100%",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    focus: {
                      backgroundColor: appConfig.theme.colors.neutrals[600],
                    },
                    hover: {
                      backgroundColor: appConfig.theme.colors.neutrals[600],
                    },
                  }}
                >
                  <Image src={sticker} />
                </Text>
              ))}
            </div>
          </Box>
        </Box>
      )}
    </Box>
  );
}
