import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import React, { useState } from "react";
import appConfig from "../config.json";

//Router
import { useRouter } from "next/router";

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const [minUsername, setMinUsername] = useState(true);

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.neutrals["100"],
          backgroundImage:
            "url(https://i.ytimg.com/vi/hWPPD5ww0eA/maxresdefault.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            //   backgroundColor: appConfig.theme.colors.neutrals['700'],
            backgroundImage:
              "url(https://i.pinimg.com/564x/ad/60/f9/ad60f95988158832f118bc0267dc8447.jpg)",
          }}
        >
          {/* Formulário */}

          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              router.push(`/chat?username=${username}`);
            }}
            isdisabled={minUsername.toString()}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Boas vindas de volta, aventureiro!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                marginTop: "12px",
                padding: "3px 10px",
                borderRadius: "1000px",
                color: appConfig.theme.colors.neutrals[100],
                backgroundColor: appConfig.theme.colors.primary[200],
                fontWeight: "500",
              }}
            >
              <a href="https://github.com/BelleNerissa" target="blank">
                {appConfig.name}
              </a>
            </Text>

            <TextField
              type="text"
              value={username}
              onChange={function (event) {
                const valor = event.target.value;
                setUsername(valor);
                valor.length <= 3
                  ? setMinUsername(true)
                  : setMinUsername(false);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              disabled={minUsername}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            {!minUsername ? (
              <>
                <Image
                  styleSheet={{
                    borderRadius: "50%",
                    marginBottom: "16px",
                  }}
                  disabled={minUsername}
                  src={`https://github.com/${username}.png`}
                />
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: "3px 10px",
                    borderRadius: "1000px",
                  }}
                >
                  {username}
                </Text>
              </>
            ) : (
              <>
                <Image
                  styleSheet={{
                    borderRadius: "50%",
                    marginBottom: "16px",
                  }}
                  disabled={minUsername}
                  src={`https://c.tenor.com/a-9OPu0mBaYAAAAd/taverna-biribiri.gif`}
                />
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: "3px 10px",
                    borderRadius: "1000px",
                    textAlign: "center",
                  }}
                >
                  {"Qual seu nome, meu chapa?"}
                </Text>
              </>
            )}
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
