import { Box, Image, Text } from "@skynexui/components";
import appConfig from "../../config.json";

export default function MessageList(props) {

  return (
    <Box
      tag="ul"
      styleSheet={{
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["500"],
        marginBottom: "16px",
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
            width: 15px;
          }
          .messageListBox::-webkit-scrollbar-track {
            // border-radius: 30px;
            // background-image: url(https://i.pinimg.com/564x/73/67/6b/73676b570ef058ee041804bfa67d2170.jpg);
          }
          .messageListBox::-webkit-scrollbar-thumb {
            border-radius: 30px;
            background: ${appConfig.theme.colors.neutrals[800]};
          }
        `}</style>
        {props.mensagens.map((mensagem) => {
          console.log(mensagem)
          return (
            <>
              <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                  borderRadius: "5px",
                  padding: "6px",
                  marginBottom: "12px",
                  marginRight: "10px",
                  hover: {
                    backgroundColor: appConfig.theme.colors.primary["010"],
                   
                  },
                }}
              >
                <Box
                  styleSheet={{
                    marginBottom: "8px",
                  }}
                >
                  <Image
                    styleSheet={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "8px",
                    }}
                    src={`https://github.com/${mensagem.de}.png`}
                  />
                  <Text styleSheet={{fontWeight: "bold"}} tag="strong">{mensagem.de}</Text>
                  <Text
                    styleSheet={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginLeft: "8px",
                      color: appConfig.theme.colors.neutrals[500],
                    }}
                    tag="span"
                  >
                    {new Date(mensagem.created_at).toLocaleDateString()}
                   
                  </Text>
                </Box>
                {mensagem.texto.startsWith(":sticker:") ? (
                  <Image
                    styleSheet={{
                      width: "30%",
                      display: "inline-block",
                      marginRight: "8px",
                    }}
                    src={mensagem.texto.replace(":sticker:", "")}
                  />
                ) : (
                  <Text styleSheet={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginLeft: "8px",
                  }}>
                  {mensagem.texto}
                  </Text>
                )}
              </Text>
            </>
          );
        })}
      </div>
    </Box>
  );
}
