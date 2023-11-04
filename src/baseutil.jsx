function binSpacing (binstr) {
  let acc = ''
  for (const ch in binstr) {
    acc += binstr[ch]
    if (ch % 4 === 3) {
      acc += ' '
    }
  }
  return acc.trim()
}

function asBin (n) {
  const bin = n.toString(2)
  const mod = bin.length % 4
  if (mod === 0) {
    return binSpacing(bin)
  } else {
    return binSpacing('0'.repeat(4 - mod) + bin)
  }
}

function asDec (n) {
  return n.toString(10)
}

function asHex (n) {
  return '0x' + n.toString(16).toUpperCase()
}
function asBase (base, n) {
  return <span>{n.toString(base)}<sub>{base}</sub></span>
}

function formatValue (base, value) {
  switch (base) {
    case 2:
      return asBin(value)
    case 16:
      return asHex(value)
    case 10:
      return asDec(value)
    default:
      return asBase(base, value)
  }
}

const baseChoices = [
  {
    label: 'Binary',
    value: 2
  },
  {
    label: 'Octal',
    value: 8
  },
  {
    label: 'Decimal',
    value: 10
  },
  {
    label: 'Hexadecimal',
    value: 16
  }
]

function localize (base) {
  for (const choice of baseChoices) {
    if (base === choice.value) {
      return choice.label
    }
  }
  return 'Base ' + base
}

export default {
  binSpacing,
  asBin,
  asDec,
  asHex,
  asBase,
  formatValue,
  localize,
  baseChoices
}
