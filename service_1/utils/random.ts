export function randomWord(): string {
  // random num in range [0 ; 10)
  const rand = Math.floor(Math.random() * 10);
  return words[rand];
}

const words =[
  "Message",
  "August",
  "Apple",
  "From",
  "September",
  "Dry",
  "Night",
  "Sun",
  "Job",
  "Random"
]