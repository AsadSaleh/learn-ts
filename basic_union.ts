
type User = {
  name: string
  age: number
  gender: "male" | "female"
}

function goToToilet(user: User) {
  if (user.gender === "male") {
    console.log("Go to male toilet!")
  } else {
    console.log("Go to female toilet")
  }
}