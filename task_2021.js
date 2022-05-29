/**
Написать функцию, которая будет принимать объект и копировать из него
только те свойства, которые прописаны в условиях. Изменение этих ключей
в новом объекте не должны менять значения в старом. Пример вызова
функции copy(obj, ['key1.key2.key3', 'key2.key1']).
Второй аргумент функции - это массив путей, по которым нужно выполнять
копирование. Этот аргумент может отсутствовать в объекте, например:

a = {
b: null
}

a.b.c
*/
const obj = {
    b: null,
    t: 145,
    e: "test"
}

const _getItemByPath = (obj, path) => {
    const _pathKeys = path.split('.');
    let _tmp = obj;

    for (let i = 0; i < _pathKeys.length; i++) {
        if (_tmp[path[i]] !== undefined)
            _tmp = _tmp[path[i]];
        else throw Error(`Attempt to get undefined element`)
    }

    return _tmp
}
const _setByPath = (obj, path, item) => {
    const _pathKeys = path.split('.');
    let _tmp = obj
    const lastPathPiece = _pathKeys
        .splice(_pathKeys.length - 1, 1);

    for (let i = 0; i < _pathKeys.length; i++) {
        if (_tmp[_pathKeys[i]] === undefined) {
            _tmp[_pathKeys[i]] = {}
            _tmp = _tmp[_pathKeys[i]]
        }
    }

    if (typeof item === 'object') {
        _tmp[lastPathPiece] = JSON.parse(JSON.stringify(item))
    } else {
        _tmp[lastPathPiece] = item
    }

    return obj
}

function _nonRecursiveTraversal(obj) {
    const stack = [];

    stack.push(obj);

    while (stack.length) {
        for (var j in stack[0]) {
            if (typeof stack[0][j] === 'object') {
                if (Array.isArray(stack[0][j])) {
                    stack.push(...stack[0][j]);
                }
                else {
                    stack.push(stack[0][j])
                }
            } else {
                stack[0][j] = this(stack[0][j]);
            }
        }
        stack.shift();
    }
}

copy(obj, ['b', 'key1.key2.key3'])
copy(obj, ['b', 'c.d.e'])
copy(obj, ['t', 'key2.key3.key4'])
copy(obj, ['e', 'key2.key3.key5'])
obj.e = 13
// сохранили key2.key3.key5 "test"
console.log(obj)


/**
Есть компонент A, принимающий слот, внутри компонента A лежит
компонент B, внутри которого компонент C. Задача - передать слот
из компонента A в компонент C

Уточнение - прокинуть слот с ограниченной областью видимости из
родительского компонента в самый нижний.
Допустим есть таблица, внутри которой компонент строки, внутри
которого компонент ячейки.
И в этот компонент ячейки должен передаться слот с ограниченной
областью видимости из компонента таблицы.

*/

/**
 * ВЫНЕС В ОТДЕЛЬНЫЙ ПРОЕКТ
 */


/**
Реализовать функцию, которая принимает любой тип данных, и преобразовывать тип boolean (при его наличии) в числовое значение.
В качестве параметров могут быть объекты любого уровня вложенности, массивы, строки, числа и т.д.
Т.е. пример
*/
let booleanToInt = booleanToIntJSON.bind(console.log)

booleanToInt('qwerty') // 'qwerty'
booleanToInt(1) // 1
booleanToInt(false) // 0
booleanToInt(true) // 1
booleanToInt([1, 'qwerty', false]) // [1, 'qwerty', 0]
booleanToInt([1, 'qwerty', { a: true }]) // [1, 'qwerty', { a: 1 }]
booleanToInt({ a: { b: true }, c: false, d: 'qwerty' }) // { a: { b: 1 }, c: 0, d: 'qwerty' }
booleanToInt({
    date1: {
        date1_1: 1,
        date1_2: [
            {
                date2_1: false,
                date2_2: 'str1',
            },
            {
                date2_3: true,
                date2_4: 'str2',
            },
            {
                date2_5: false,
                date2_6: 'str1',
            },
        ],
        date1_3: false,
        date1_4: {
            date3_1: true,
            date3_2: false,
            date3_3: 'str1',
            date3_4: true,
            date3_5: 123,
        },
        date1_5: 'true',
        date1_6: "Test, true"
    }
})

booleanToInt = booleanToIntTraversal.bind(console.log)

booleanToInt('qwerty') // 'qwerty'
booleanToInt(1) // 1
booleanToInt(false) // 0
booleanToInt(true) // 1
booleanToInt([1, 'qwerty', false]) // [1, 'qwerty', 0]
booleanToInt([1, 'qwerty', { a: true }]) // [1, 'qwerty', { a: 1 }]
booleanToInt({ a: { b: true }, c: false, d: 'qwerty' }) // { a: { b: 1 }, c: 0, d: 'qwerty' }
booleanToInt({
    date1: {
        date1_1: 1,
        date1_2: [
            {
                date2_1: false,
                date2_2: 'str1',
            },
            {
                date2_3: true,
                date2_4: 'str2',
            },
            {
                date2_5: false,
                date2_6: 'str1',
            },
        ],
        date1_3: false,
        date1_4: {
            date3_1: true,
            date3_2: false,
            date3_3: 'str1',
            date3_4: true,
            date3_5: 123,
        },
        date1_5: 'true',
        date1_6: "Test, true"
    }
})

/**
 * Писал на ноде не заходя в браузер (в браузере в
 * String prototype есть replaceAll, вместо флагов и ргулярки
 * можно использовать строки и replaceAll)
 *
 * В данной реализации могут возникнуть неочевидные баги,
 * если в объекте или массиве есть строка, содержащая в себе
 * указанные строковые паттерны
 *
 * @param obj
 * @returns {any}
 */
function booleanToIntJSON(obj) {
    let result
    if (typeof obj === 'boolean') {
        result = Number(obj)
    } else {
        result = JSON.parse(JSON.stringify(obj)
            .replace(/:true/gm, ":1")
            .replace(/:false/gm, ":0")
            .replace(/,false/gm, ',0')
            .replace(/,true/gm, ',1')
        )
    }
    if (this) this(result)
    return result
}

/**
 * Не костыльный способ решения
 * Работает для любых строк, типов данных
 * должен выполняться чуть быстрее чем JSON вариант,
 * ошибок в тестах не нашел
 *
 * @param obj
 * @returns {any}
 */
function booleanToIntTraversal(obj) {
    // Замена значений
    const boolToInt = (el) => {
        if (typeof el === 'boolean')
            return Number(el)
        else
            return el
    }
    if (typeof obj === 'object') {
        // Передаём в нерекурсивный обход объекта объявленный выше хендлер
        const traversal = _nonRecursiveTraversal.bind(boolToInt);
        traversal(obj);

        // можем забайндить сюда любую другую логику если она необходима (в данном случае логирование)
        if (this) this(obj)
        return obj
    } else {
        // для примитивных типов данных используем boolToInt без обхода объекта
        obj = boolToInt(obj)
        if (this) this(obj)
        return obj
    }

}

/**
 * Copy object element from path[0] to path[1]
 *
 * Warning: not serialized types will no save
 *
 * Алгоритм без рекурсии
 *
 * @param obj
 * @param paths
 */
function copy(obj, paths) {
    const [from, to] = paths;
    try {
        const item = _getItemByPath(obj, from);
        _setByPath(obj, to, item);
        return obj
    } catch (e) {
        throw Error(`Invalid path in Object ${obj}`)
    }
}

/**
 * @type {{booleanToIntJSON: (function(*): number), booleanToIntTraversal: ((function(*): *)|*), copy: ((function(*, *): (*|undefined))|*)}}
 */
module.exports = {
    copy,
    booleanToIntTraversal,
    booleanToIntJSON
}