실무에서 단위 테스트를 작성할 때 가짜 데이터가 필요할 때가 왕왕 있습니다. 저는 실무에서 여러 군대에서 faker.js를 사용하여 테스트 코드를 작성했었는데 특히 동접자 3만 명 이상의 데이터가 들어왔을 때, 데이터를 가져오는 과정에 문제가 없는지에 대해 체크를 할 때 유용하게 사용했습니다. 3만 개의 데이터를 하드 코딩하는 것은 당연히 무리가 있을 것입니다. 또한 프로젝트 상 데이터가 중복되면 안 되는 상황이어서 faker.js를 사용하게 되었습니다.

[##_Image|kage@pDlQp/btrA33WfU6w/VHemMiYWlllUfMs1OvKrY0/img.jpg|CDM|1.3|{"originWidth":1280,"originHeight":1280,"style":"alignCenter","width":382,"height":382,"alt":"faker로고","caption":"Faker.js"}_##]

## **Faker**

---

시제품을 개발하거나 단위 테스트를 작성할 때 가짜 데이터가 필요할 때가 자주 있습니다. **Faker란 영어 뜻 그대로 가짜 데이터를 쉽게 생성할 수 있는 라이브러리**입니다. 사용 방법으로는 ES 모듈을 사용하는 프로젝트에서는 import 키워드를 사용해 패키지를 임포트 하고, CommonJS를 사용하는 프로젝트에서는 require 키워드를 사용해서 패키지를 임포트 합니다.

#### **Install**

```
npm install @faker-js/faker --save-dev
```

or

```
yarn add @faker-js/faker --dev
```

or

```
pnpm add @faker-js/faker --save-dev
```

#### **Usage**

```
import faker from "faker";
```

or

```
import { faker } from '@faker-js/faker';
```

Faker.js API는 기본적으로 **faker.<범주>.<함수>()** 형태를 사용합니다. 반복문을 돌려 여러 개의 데이터를 한 번에 삽입할 때 매번 다른 데이터를 output 해줍니다. 함수 자체가 워낙 많기 때문에 필요한 함수는 [**공식문서**](https://fakerjs.dev/api/address.html "공식문서")에서 찾아보시면 될 것 같습니다. 

#### **Example**

```
const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomCard = faker.helpers.createCard(); // An object representing a random contact card containing many properties
```

공식문서에 나온 예시를 보시면 범주와 함수에 따라 알맞은 형식의 데이터를 뽑아내는 것을 확인할 수 있었습니다. 사용법도 어려운 부분이 없어서 누구나 유용하게 쓸 수 있는 라이브러리인 것 같습니다.

#### **Unit Test**

```
describe('#addFree',() => {
  it('addFree', async (done) => {
    try{
      for (let i=0;i<1;i++){
        let result = await boardFreeService.addFree(
          faker.lorem.words(),
          faker.lorem.sentences(),
          faker.name.findName(),
          faker.internet.password(),
          false,
          faker.internet.email());
        console.log(result);
      }
      assert.ok(true);
      done();
    }
    catch (err){
      done(err);
    }
  });
});
```

간단한 예시로 테스트 코드를 작성해봤습니다. 자유게시판에 반복문을 통해서 실제 DB에 Insert가 되는지 테스트를 해보았습니다. 콘솔과 DB에 값이 잘 나오는 것을 확인할 수 있었습니다.

[##_Image|kage@ckm95o/btrA7OJSgxQ/uKQDjMSXHnA9q5t6pF1gs1/img.png|CDM|1.3|{"originWidth":1084,"originHeight":346,"style":"alignCenter","alt":"log","caption":"로그"}_##][##_Image|kage@cffUPH/btrA6asIA9m/y8vUhJZ15v09iusyjO9xdK/img.png|CDM|1.3|{"originWidth":690,"originHeight":311,"style":"alignCenter","alt":"db","caption":"DB 삽입"}_##]

저의 경우 3만 개의 데이터를 DB에 넣어본 후에 리스트를 불러올 때 오류를 만났었습니다. 실제로 많은 양의 데이터가 DB에 들어간 후 다시 리스트 화해서 데이터를 꺼내올 때, 코드를 잘못 구성하면 byte가 초과해서 데이터를 불러오지 못하는 경우가 있습니다. 테스트를 진행하지 않고 서버가 운영되었을 때, 이런 상황이 발생하면 정말 난감하겠죠.. 이럴 때 테스트를 위해 Faker.js를 사용하게 됩니다. 저도 이 라이브러리 덕분에 손쉽게 많은 양의 데이터를 한 번에 삽입할 수 있어서 다행히 그런 상황은 모면했었습니다.

#### **다국어 지원**

영어가 아닌 다른 언어로 가짜 데이터를 사용하고 싶을 때는 **faker.locale**에 해당 언어의 값을 설정해주면 됩니다. 

```
import faker from "faker";

faker.locale = "ko";
```

### **마치며**

---

faker.js 라이브러리는 사용법도 워낙 쉽고, 공식문서도 정리가 잘 되어 있어서 크게 설명드릴 부분이 없는 것 같습니다. 간단한 예시를 보면서 원하는 함수들은 공식문서를 참조해 쉽게 구현이 가능하실 것 같습니다.
