const express = require("express");

var users = [
  {
    name: "Prashant",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },

  {
    name: "Priyanka",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

const app = express();

app.use(express.json());

app.get("/", function (req, res) {


  var response = [];
  users.forEach((user) => {
    const kidneys = user.kidneys;
    const healthyKidneys = kidneys.filter((kidney) => kidney.healthy);
    const unhealthyKidneys = kidneys.length - healthyKidneys.length;
    response.push({
      name:user.name, 
      kidneys: kidneys.length,
      healthyKidneys: healthyKidneys.length,
      unhealthyKidneys,
    });
  });

  res.json(response);
});

app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;

  users.forEach((user) => {
    user.kidneys.push({
      healthy: isHealthy,
    });
  });

  res.json(users);
});

app.put("/", function (req, res) {
  users.forEach((user) =>
    user.kidneys.forEach((kidney) => {
      kidney.healthy = true;
    })
  );

  res.json(users);
});

app.delete("/", function (req, res) {
  if (!havingAnyUnhealthyKidney(users)) {
    return res.status(411).json({
      msg: "You have no bad kidneys",
    });
  }

  var usersWithoutUnhealthyKidneys = users.map((user) => ({
    ...user,
    kidneys: user.kidneys.filter((kidney) => kidney.healthy),
  }));


  users = usersWithoutUnhealthyKidneys;
  res.json({
    usersWithoutUnhealthyKidneys,
  });
});

function havingAnyUnhealthyKidney(users) {
  return users.some((user) => {
    return user.kidneys.some((kidney) => !kidney.healthy);
  });
}

// GLOBAL CATCHES
app.use(function(err,req,res,next){
    res.json({
        msg:"Sorry something is wrong with our server"
    })
})

app.listen(3000);
