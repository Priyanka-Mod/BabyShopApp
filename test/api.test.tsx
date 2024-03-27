import TestApi from "../src/components/test/TestApi";

it('Api test case' , async function(){
    global.fetch = jest.fn().mockImplementation(() => {
        let p = new Promise((resolve, reject) => {
            resolve({
                json:function (){
                    return {Id: 1}
                }
            })
        })
        return p;
    })

    const res =  await TestApi.all();
    
    expect(res.Id).toBe(1)
})