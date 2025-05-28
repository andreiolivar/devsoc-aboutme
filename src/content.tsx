export const aboutme = {
  heading: "About Me",
  content: () => {
    return (
      <div className="flex flex-col gap-3">
        <p>Hello! My name is Andrei.</p>
        <p>Im a 2nd year Computer Science student at UNSW.</p>
        <p className="mt-5">Click on the tabs below to learn more about me!</p>
      </div>
    )
  }
}

export const hobbies = {
  heading: "Hobbies",
  content: () => {
    return (
      <div className="flex flex-col gap-3">
        <p>This is the hobbies page</p>
      </div>
    )
  }
}