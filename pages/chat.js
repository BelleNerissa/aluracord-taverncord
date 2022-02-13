<script src="https://gist.github.com/omariosouto/8517c711f36770b73371185e4aed92d6.js"></script>;
import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import appConfig from "../config.json";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";

//Componets Chat
import Header from "../src/components/header";
import MessageList from "../src/components/messageList";

//*Notas
// FETCH API
// ⬇ funcao callback via JS para acessar a url da api do github e trazer o conteudo da resposta .... o que o supabase vai fazer
// fetch('https://api.github.com/users/BelleNerissa').then(async (resp) => { const resposta = await resp.json(); //console.log(resposta);})
// lib supabase-js @supabase/supabase-js

//*Metodo manual que a biblioteca faz
// fetch(`${SUPABASE_URL}/rest/v1/listaDeMensagens?select=*`, {
//   headers: {
//     "Content-Type": "application/json",
//     apiKey: SUPABASE_ANON_KEY,
//     Authorization: "Bearer" + SUPABASE_ANON_KEY,
//   },
// })
//   .then((resp) => {
//     return resp.json();
//   })
//   .then((response) => {
//     //console.log(response);
//   });

//* Integração SUPABASE

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzgxMDMyNiwiZXhwIjoxOTU5Mzg2MzI2fQ.fX-lUHfx_3kvnQE9XWokC9bWxhglkgonOwiYvEYMRGY";
const SUPABASE_URL = "https://cqqbgintwkuaevupuutf.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from("listaDeMensagens")
    .on("INSERT", (newResp) => {
      adicionaMensagem(newResp.new);
    })
    .subscribe();
}

export default function chat() {
  const router = useRouter();
  const userAtual = router.query.username;
  const [mensagem, setMensagem] = useState("");
  const [listaDeMensagens, setListaDeMensagens] = useState([]);

  // useEffect ➡ Tudo que foge do fluxo padrão(execucao) do componente, efeito colateral, extra
  useEffect(() => {
    //'data' já esta extraindo o valor data do evento
    //'order()' ➡ metodo do supabase para reorganizar a lista da tabela com algum padrao'
    supabaseClient
      .from("listaDeMensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data);
      });

    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      // console.log("Nova mensagem:", novaMensagem);
      // console.log("listaDeMensagens:", listaDeMensagens);
      // Quero reusar um valor de referencia (objeto/array)
      // Passar uma função pro setState

      // setListaDeMensagens([
      //     novaMensagem,
      //     ...listaDeMensagens
      // ])
      setListaDeMensagens((valorAtualDaLista) => {
        return [novaMensagem, ...valorAtualDaLista];
      });
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  // 'listener' ➡ em descorrencia da alteração de estado dessa [variavel] a função useEffect é chamada novamente

  //*Adicionar a mensagem a lista de mensagens
  function handleNovaMensagem(mensagemNova) {
    const mensagem = {
      // id: listaDeMensagens.length + 1,
      de: userAtual,
      texto: mensagemNova,
    };
    supabaseClient
      .from("listaDeMensagens")
      .insert([
        //Tem que ser um obj com os mesmos campos da tabela do supabase
        mensagem,
      ])
      .then(({ data }) => {
        // console.log(data);
      });
    setMensagem("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(https://i.ytimg.com/vi/hWPPD5ww0eA/maxresdefault.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[900],
          backgroundImage:
            "url(https://i.pinimg.com/564x/ad/60/f9/ad60f95988158832f118bc0267dc8447.jpg)",
          height: "80%",
          maxWidth: "70%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header user={userAtual} />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals["010"],
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage:
              "url(https://i.pinimg.com/564x/99/4f/2c/994f2ccfc0aa8203700d0fb10dd92009.jpg)",
              // BackgroundDirection: "center",
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
            overflow: "hidden",
          }}
        >
          {console.log(listaDeMensagens, "listaDeMensagens")}
          <MessageList mensagens={listaDeMensagens.reverse()} />
          {/* {listaDeMensagens.map((mensagemAtual) => {
            return (
                <>
              <li key={mensagemAtual.id}>
                {mensagemAtual.de}:{mensagemAtual.texto}
              </li>
               </>
            );
          })} */}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Campo de Texto */}
            <TextField
              name="campo_mensagens"
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              //   info do que foi precionado
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            {/* Callback */}
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                handleNovaMensagem(`:sticker:${sticker}`);
              }}
            />
            <Button
              type="submit"
              variant="primary"
              colorVariant="positive"
              label="Enviar"
              size="xl"
              onClick={(event) => {
                event.preventDefault();
                handleNovaMensagem(mensagem);
              }}
              styleSheet={{
                padding: "10px 30px",
                marginBottom: "10px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
