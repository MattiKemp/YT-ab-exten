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
    const response = await fetch("http://173.21.223.105:9000/" + endPoint,otherParam)
    const content = await response.json();
    console.log(content);
    return content;
}

test('Check following endpoints.', async () => {
    expect((await makePostRequest({user: "matt", pass: "password", email:"matt@email.com"}, 'signup/')).valid).toEqual("YES");
    expect((await makePostRequest({user: "matt", pass: "password"}, 'login/')).valid).toEqual("YES");
    expect((await makePostRequest({user: "matt", pass: "password1"}, 'login/')).valid).toEqual("NO");

});