import Parse from 'parse';

/**
 * Salva os dados do cadastro.
 * @param {Object} data Objeto contendo os dados do cadastro.
 */
export const saveContract = async (data) => {
    const Contract = Parse.Object.extend('Contract');
    const Person = Parse.Object.extend('Person');

    const contract = new Contract();
    const person = new Person();

    const newDate = new Date();

    const title = Math.floor(Math.random() * 1000);
    const startDate = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
    const endDate = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear() + 5}`;

    const file = data.pdfContract[0];
    const fileName = file.name;
    const parseFile = new Parse.File(fileName, file);

    try {
        const res = await contract.save({
            title: title,
            startDate: startDate,
            endDate: endDate
        });

        await parseFile.save();

        person.save({
            parent: res,
            cpf: data.cpf,
            email: data.email,
            lastName: data.lastName,
            name: data.name,
            telephone: data.telephone,
            contract: parseFile
        });
    } catch (err) {
        console.log(err);
    }
}

/**
 * Retorna o contrato do respectivo 'id'.
 * @param {String} id Um 'id' em formato string. 
 */
export const getContract = id => {
    const Contract = Parse.Object.extend('Contract');
    const query = new Parse.Query(Contract);

    query.equalTo('objectId', id);

    return query.first();
}

/**
 * Retorna a pessoa do respectivo 'parent'.
 * @param {Parse.Object} parent Uma referência a um objeto de outra tabela que está relacionado a está. 
 */
export const getPerson = parent => {
    const Person = Parse.Object.extend('Person');
    const query = new Parse.Query(Person);

    query.equalTo('parent', parent);

    return query.first();
}

/**
 * Retorna todos os contratos.
 */
export const getAllContracts = () => {
    const Contract = Parse.Object.extend('Contract');
    const query = new Parse.Query(Contract);

    return query.find();
}

/**
 * Remove um respectivo contrato e a pessoa que o tem.
 * @param {String} id Um 'id' em formato string.
 */
export const deleteContract = async (id) => {
    try {
        const contractData = await getContract(id);
        const personData = await getPerson(contractData);

        personData.destroy();
        contractData.destroy();
    } catch (err) {
        console.log(err);
    }
}