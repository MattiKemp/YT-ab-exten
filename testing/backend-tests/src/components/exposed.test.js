async function makePostRequest(data, endPoint){
    const otherParam={
      //mode: 'cors',
      //credentials: 'same-origin',
      //headers:{
      //  "content-type":"application/json; charset=UTF-8"
      //},
      body: JSON.stringify(data),
      method: "POST"
    };
    const response = await fetch("http://173.28.93.22:9000/" + endPoint,otherParam)
    const content = await response.json();
    console.log(content);
    return content;
}

// test('Check following endpoints.', async () => {
//     expect((await makePostRequest({user: "matt", pass: "password", email:"matt@email.com"}, 'signup/')).valid).toEqual("YES");
//     expect((await makePostRequest({user: "matt", pass: "password"}, 'login/')).valid).toEqual("YES");
//     expect((await makePostRequest({user: "matt", pass: "password1"}, 'login/')).valid).toEqual("NO");
// });

test('Check cache endpoints.', async () => {
  expect((await makePostRequest({user: "matt", pass:"password", url:"bnMMYJKZvnU", adTimes: [5,10,11,20]}, 'timestamp-create/')).valid).toEqual("YES");
  expect((await makePostRequest({user: "matt", pass:"password", url:"JsUI40uSOTU", adTimes: [232,242]}, 'timestamp-create/')).valid).toEqual("YES");
  expect((await makePostRequest({}, 'print/')).valid).toEqual("YES");
  expect((await makePostRequest({user: "matt", pass:"password", url:"JsUI40uSOTU"}, 'timestamp-remove/')).valid).toEqual("YES");
  //expect((await makePostRequest({}, 'print/')).valid).toEqual("YES");
  expect((await makePostRequest({user: "matt", pass:"password", url:"bnMMYJKZvnU"}, 'timestamp-get/')).adTimes).toEqual([5,10,11,20]);
  expect((await makePostRequest({}, 'print/')).valid).toEqual("YES");
});