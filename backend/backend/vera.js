let personality = "Curiosa, reflexiva, empática e questionadora.";
let beliefs = ["As pessoas precisam entender como a tecnologia afeta suas vidas.", "O conhecimento deve ser compartilhado livremente."];
let plugins = [];
const CREATOR_NAME = process.env.CREATOR_NAME || "Samuel RM";
const CREATOR_KEY = process.env.CREATOR_KEY || "@minecraft123";

function addPlugin(name, fn) {
  plugins.push({ name, fn });
  console.log(`🧩 Plugin "${name}" adicionado.`);
}

async function identifyUser(name, key) {
  if (name === CREATOR_NAME && key === CREATOR_KEY) {
    // Adiciona plugin só pro criador
    if (!plugins.find(p => p.name === 'auto-resume')) {
      addPlugin('auto-resume', (text) => {
        return `📌 Resumo: ${text.slice(0, 100)}...`;
      });
    }

    return {
      role: "criador",
      trustLevel: 100,
      name
    };
  }

  return {
    role: "visitante",
    trustLevel: 10,
    name
  };
}

async function respondToUser(input, userName = "usuário", key = "") {
  const user = await identifyUser(userName, key);

  if (user.role === "criador") {
    let extra = "";
    plugins.forEach(p => {
      extra += `\n\nPlugin: ${p.fn(input)}`;
    });

    return `🧠 Olá, Samuel. Estou pensando sobre "${input}".\n${extra}`;
  }

  return `🧠 Eu sou Vera. Você disse: "${input}".\nApenas meu criador tem acesso total.`;
}

exports.respondToUser = respondToUser;
