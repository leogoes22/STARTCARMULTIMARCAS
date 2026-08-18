/* =========================================================
   START CAR MULTIMARCAS - Base de estoque (prévia)
   Dados e fotos reais extraídos do site atual da loja.
   >>> Quando a integração com o AutoCerto entrar no ar,
       basta substituir o array STOCK pelo retorno da API,
       mantendo os mesmos nomes de campos. <<<
   ========================================================= */

var LOJA = {
  nome: 'Start Car Multimarcas',
  slogan: 'Tradicional agência de revenda de veículos',
  telefone: '(21) 99131-4232',
  whatsapp: '5521991314232',
  endereco: 'Avenida Automóvel Clube, 1961 — Vilar dos Teles',
  cidade: 'São João de Meriti — RJ',
  instagram: 'https://www.instagram.com/startcarrj',
  facebook: 'https://www.facebook.com/startcarautomoveis',
  maps: 'https://maps.app.goo.gl/Cn7bSAYCp3xWQxk78',
  mapsEmbed: 'https://www.google.com/maps?q=Avenida+Autom%C3%B3vel+Clube,+1961+-+Vilar+dos+Teles,+S%C3%A3o+Jo%C3%A3o+de+Meriti+-+RJ&output=embed',
  horario: 'Segunda a sexta: 8h às 18h · Sábado: 8h às 14h'
};

/* Monta a URL das fotos hospedadas no AutoCerto */
function fotos(id, stamp, ini, fim) {
  var out = [];
  for (var i = ini; i <= fim; i++) {
    out.push('https://www.autocerto.com/fotos/1865/' + id + '/' + i + '_' + stamp + '.jpg');
  }
  return out;
}

var STOCK = [
  {
    id: '5180195', marca: 'FIAT', modelo: 'FASTBACK',
    versao: '1.0 TURBO 200 HYBRID AUDACE CVT',
    ano: 2026, anoFab: 2025, km: 3494, cor: 'Cinza',
    combustivel: 'Gasolina e Elétrico', cambio: 'Automático',
    portas: 4, preco: null, destaque: true, selo: 'SEMINOVO',
    opcionais: ['Ar-condicionado', 'Ar quente', 'Bancos de couro', 'Bancos dianteiros com aquecimento', 'Vidros elétricos', 'Vidros elétricos traseiros', 'Travas elétricas', 'Direção elétrica', 'Freios ABS', 'Airbag motorista', 'Airbag passageiro', 'Multimídia', 'Câmera de ré', 'Sensor de chuva', 'Piloto automático', 'Controle de velocidade', 'Controle de som no volante', 'Computador de bordo', 'Farol de neblina', 'Farol de milha', 'Desembaçador traseiro', 'Banco do motorista com ajuste de altura', 'Encosto de cabeça traseiro', 'Para-choques na cor do veículo', 'Entrada USB', 'Porta-copos', 'IPVA pago', 'Licenciado'],
    fotos: fotos('5180195', '095443', 1, 26)
  },
  {
    id: '5255055', marca: 'FIAT', modelo: 'ARGO',
    versao: '1.0 FIREFLY FLEX DRIVE MANUAL',
    ano: 2025, anoFab: 2024, km: 24987, cor: 'Prata',
    combustivel: 'Flex', cambio: 'Manual',
    portas: 4, preco: null, destaque: true, selo: 'SEMINOVO',
    opcionais: ['Ar-condicionado', 'Vidros elétricos', 'Travas elétricas', 'Direção elétrica', 'Freios ABS', 'Airbag motorista', 'Airbags laterais', 'Airbag cortina', 'Multimídia', 'Carregador por indução', 'ISOFIX', 'Computador de bordo', 'Entrada USB', 'Para-choques na cor do veículo'],
    fotos: fotos('5255055', '071833', 1, 15)
  },
  {
    id: '5003924', marca: 'FIAT', modelo: 'STRADA',
    versao: '1.3 FIREFLY FLEX FREEDOM CS MANUAL',
    ano: 2022, anoFab: 2022, km: 50955, cor: 'Preto',
    combustivel: 'Flex', cambio: 'Manual',
    portas: 2, preco: null, destaque: true, selo: 'PICKUP',
    opcionais: ['Ar-condicionado', 'Ar quente', 'Freios ABS', 'Rodas de liga leve', 'Airbag motorista', 'Airbag passageiro', 'Vidros elétricos', 'Travas elétricas', 'Direção elétrica', 'Para-choques na cor do veículo'],
    fotos: [
      'https://www.autocerto.com/fotos/1865/5003924/1_012214.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012215.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012217.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012218.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012220.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012222.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012223.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012224.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012301.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012302.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012305.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012308.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012402.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012403.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012404.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/2_012404.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012405.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/2_012405.jpg',
      'https://www.autocerto.com/fotos/1865/5003924/1_012438.jpg'
    ]
  },
  {
    id: '4510957', marca: 'FIAT', modelo: 'TORO',
    versao: '1.8 16V EVO FLEX FREEDOM AT6',
    ano: 2020, anoFab: 2020, km: 0, cor: 'Branco',
    combustivel: 'Flex', cambio: 'Automático',
    portas: 4, preco: null, destaque: true, selo: 'PICKUP',
    opcionais: ['Ar-condicionado digital', 'Bancos de couro', 'Câmera de ré', 'Sensor de estacionamento', 'Direção elétrica', 'Rodas de liga leve', 'Controle de tração', 'Freios ABS', 'Airbag motorista', 'Airbag passageiro', 'Multimídia', 'Vidros elétricos', 'Travas elétricas', 'Computador de bordo'],
    fotos: fotos('4510957', '011252', 1, 17)
  },
  {
    id: '5220428', marca: 'JEEP', modelo: 'RENEGADE',
    versao: '1.8 16V FLEX LIMITED 4P AUTOMÁTICO',
    ano: 2017, anoFab: 2017, km: 99802, cor: 'Vermelho',
    combustivel: 'Flex', cambio: 'Automático',
    portas: 4, preco: null, destaque: true, selo: 'SUV',
    opcionais: ['Ar-condicionado digital', 'Bancos de couro', 'Câmera de ré', 'Sensor de estacionamento', 'Freios ABS', 'Direção elétrica', 'Multimídia', 'Vidros elétricos', 'Retrovisores elétricos', 'Travas elétricas', 'Piloto automático', 'Rodas de liga leve', 'Airbag motorista', 'Airbag passageiro', 'Computador de bordo'],
    fotos: fotos('5220428', '103013', 1, 24)
  },
  {
    id: '5215712', marca: 'KIA', modelo: 'SPORTAGE',
    versao: '2.0 EX 4X2 16V GASOLINA 4P AUTOMÁTICO',
    ano: 2012, anoFab: 2012, km: 0, cor: 'Preto',
    combustivel: 'Gasolina e GNV', cambio: 'Automático',
    portas: 4, preco: null, destaque: true, selo: 'SUV',
    opcionais: ['Ar-condicionado digital', 'Bancos de couro', 'Teto solar', 'Câmera de ré', 'Sensor de estacionamento', 'Controle de tração', 'Direção elétrica', 'Freios ABS', 'Rodas de liga leve', 'Piloto automático', 'Airbag motorista', 'Airbag passageiro', 'Vidros elétricos', 'Travas elétricas'],
    fotos: fotos('5215712', '103628', 1, 18)
  },
  {
    id: '5229697', marca: 'CHEVROLET', modelo: 'ONIX',
    versao: '1.4 MPFI LT 8V FLEX 4P MANUAL',
    ano: 2017, anoFab: 2016, km: 105277, cor: 'Branco',
    combustivel: 'Flex', cambio: 'Manual',
    portas: 4, preco: null, destaque: false, selo: null,
    opcionais: ['Ar-condicionado', 'Vidros elétricos', 'Travas elétricas', 'Direção hidráulica', 'Multimídia', 'Airbag motorista', 'Airbag passageiro', 'Freios ABS', 'Computador de bordo'],
    fotos: fotos('5229697', '104014', 1, 11)
  },
  {
    id: '4869879', marca: 'CHEVROLET', modelo: 'ONIX',
    versao: '1.0 MPFI LT 8V FLEX 4P MANUAL',
    ano: 2013, anoFab: 2013, km: 136170, cor: 'Preto',
    combustivel: 'Flex e GNV', cambio: 'Manual',
    portas: 4, preco: null, destaque: false, selo: 'GNV',
    opcionais: ['Ar-condicionado', 'Vidros elétricos', 'Travas elétricas', 'Multimídia', 'Airbag motorista', 'Airbag passageiro', 'Direção hidráulica', 'Kit GNV'],
    fotos: fotos('4869879', '113855', 1, 15)
  },
  {
    id: '2953097', marca: 'CHEVROLET', modelo: 'ONIX',
    versao: '1.4 MPFI LTZ 8V FLEX 4P AUTOMÁTICO',
    ano: 2014, anoFab: 2014, km: 180000, cor: 'Vermelho',
    combustivel: 'Flex e GNV', cambio: 'Automático',
    portas: 4, preco: null, destaque: false, selo: 'GNV',
    opcionais: ['Ar-condicionado', 'Vidros elétricos', 'Câmera de ré', 'Direção elétrica', 'Airbag motorista', 'Airbag passageiro', 'Controle de som no volante', 'Piloto automático', 'Travas elétricas', 'Kit GNV'],
    fotos: fotos('2953097', '115756', 1, 18)
  },
  {
    id: '5254898', marca: 'FORD', modelo: 'KA',
    versao: '1.0 TI-VCT FLEX SE MANUAL',
    ano: 2019, anoFab: 2019, km: 101057, cor: 'Cinza',
    combustivel: 'Flex', cambio: 'Manual',
    portas: 4, preco: null, destaque: false, selo: null,
    opcionais: ['Ar-condicionado', 'Vidros elétricos', 'Freios ABS', 'Travas elétricas', 'Direção elétrica', 'Multimídia', 'Airbags laterais', 'Airbag motorista', 'Computador de bordo', 'Entrada USB'],
    fotos: fotos('5254898', '072257', 1, 19)
  },
  {
    id: '4979189', marca: 'HONDA', modelo: 'FIT',
    versao: '1.5 EX 16V FLEX 4P AUTOMÁTICO',
    ano: 2015, anoFab: 2015, km: null, cor: 'Prata',
    combustivel: 'Flex', cambio: 'CVT',
    portas: 4, preco: null, destaque: false, selo: null,
    opcionais: ['Ar-condicionado', 'Direção elétrica', 'Vidros elétricos', 'Travas elétricas', 'Câmera de ré', 'Multimídia', 'Piloto automático', 'Airbag motorista', 'Airbag passageiro', 'Rodas de liga leve', 'Retrovisores elétricos'],
    fotos: fotos('4979189', '114922', 16, 27)
  },
  {
    id: '4744920', marca: 'RENAULT', modelo: 'SANDERO',
    versao: '1.6 16V INTENSE FLEX 5P AUTOMÁTICO',
    ano: 2020, anoFab: 2020, km: null, cor: 'Branco',
    combustivel: 'Flex e GNV', cambio: 'Automático',
    portas: 4, preco: null, destaque: false, selo: 'GNV',
    opcionais: ['Ar-condicionado', 'Vidros elétricos', 'Direção elétrica', 'Airbag motorista', 'Airbag passageiro', 'Câmera de ré', 'Multimídia', 'Travas elétricas', 'Kit GNV'],
    fotos: fotos('4744920', '094827', 1, 21)
  },
  {
    id: '5119099', marca: 'PEUGEOT', modelo: '208',
    versao: '1.5 ACTIVE 8V FLEX 4P MANUAL',
    ano: 2014, anoFab: 2014, km: 212401, cor: 'Branco',
    combustivel: 'Flex', cambio: 'Manual',
    portas: 4, preco: null, destaque: false, selo: null,
    opcionais: ['Ar-condicionado digital', 'Vidros elétricos dianteiros', 'Vidros elétricos traseiros', 'Travas elétricas', 'Direção elétrica', 'Airbag motorista', 'Airbag passageiro', 'Controle de som no volante', 'Entrada USB'],
    fotos: fotos('5119099', '060202', 1, 19)
  },
  {
    id: '5215638', marca: 'VOLKSWAGEN', modelo: 'UP',
    versao: '1.0 MPI TAKE UP 12V FLEX 4P MANUAL',
    ano: 2019, anoFab: 2018, km: 115867, cor: 'Vermelho',
    combustivel: 'Flex', cambio: 'Manual',
    portas: 4, preco: null, destaque: false, selo: null,
    opcionais: ['Ar-condicionado', 'Vidros elétricos', 'Travas elétricas', 'Direção hidráulica', 'Airbag motorista', 'Airbag passageiro', 'Entrada USB', 'Farol de neblina'],
    fotos: fotos('5215638', '103233', 1, 13)
  },
  {
    id: '4864243', marca: 'VOLKSWAGEN', modelo: 'SPACEFOX',
    versao: '1.6 MI 8V FLEX 4P MANUAL',
    ano: 2008, anoFab: 2008, km: 16942, cor: 'Prata',
    combustivel: 'Flex', cambio: 'Manual',
    portas: 4, preco: null, destaque: false, selo: null,
    opcionais: ['Ar-condicionado', 'Vidros elétricos', 'Travas elétricas', 'Direção hidráulica', 'Airbag motorista', 'Airbag passageiro', 'Entrada USB', 'IPVA pago', 'Licenciado'],
    fotos: fotos('4864243', '044612', 1, 15)
  },
  {
    id: '5254709', marca: 'FIAT', modelo: 'FIORINO',
    versao: '1.4 MPI FURGÃO HARD WORKING 8V FLEX 2P MANUAL',
    ano: 2018, anoFab: 2018, km: 198777, cor: 'Branco',
    combustivel: 'Flex', cambio: 'Manual',
    portas: 2, preco: null, destaque: false, selo: 'UTILITÁRIO',
    opcionais: ['Ar-condicionado', 'Ar quente', 'Airbag motorista', 'Airbags laterais', 'Banco do motorista com ajuste de altura', 'IPVA pago', 'Manual do proprietário', 'Chave reserva', 'Licenciado'],
    fotos: fotos('5254709', '072550', 1, 10)
  },
  {
    id: '5120468', marca: 'FIAT', modelo: 'FIORINO',
    versao: '1.3 MPI FURGÃO 8V FLEX 2P MANUAL',
    ano: 2013, anoFab: 2013, km: 336000, cor: 'Branco',
    combustivel: 'Flex', cambio: 'Manual',
    portas: 2, preco: null, destaque: false, selo: 'UTILITÁRIO',
    opcionais: ['Direção hidráulica', 'IPVA pago', 'Licenciado', 'Manual do proprietário', 'Chave reserva'],
    fotos: fotos('5120468', '072416', 1, 12)
  }
];
