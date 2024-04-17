const controller = require('../controllers/pantryController.js')  


test('landing page renders', () => {
      const req = {}
      const res = { render: jest.fn() }
      controller.landing_page(req, res)
      expect(res.render.mock.calls[0][0]).toBe('homePage')
    })

test('Contact Us page renders', () => {
          const req = {'title': 'Contact Us'}
          const res = { render: jest.fn() }
          controller.contact_page(req, res)
          expect(res.render.mock.calls[0][0]).toBe('contactUsEntry');
        })
test('Food Entries renders',async () => {
              const req = {'title': 'Welcome to Scottish Food Pantry Network',
            foodEntries :  [
                {
                  donator: 'James McKay',
                  foodType: 'Apples',
                  quantity: '2.5kg',
                  harvestDate: '2024-04-18',
                  depositDate: '2024-04-15',
                  pantry: null,
                  selectDate: null,
                  collectDate: null,
                  _id: '2RBG540voK2yFAMc'
                },
                {
                  donator: 'James McKay',
                  foodType: 'Potatoes',
                  quantity: '3.5kg',
                  harvestDate: '2024-03-19',
                  depositDate: '2024-04-15',
                  pantry: null,
                  selectDate: null,
                  collectDate: null,
                  _id: '9QnoqwLWlVJD36ap'
                },
                {
                  donator: 'Gary Marsh',
                  foodType: 'Pears',
                  quantity: '4kg',
                  harvestDate: '2024-04-01',
                  depositDate: '2024-04-15',
                  pantry: null,
                  selectDate: null,
                  collectDate: null,
                  _id: 'Cg9BerCSmrMLErOu'
                },
                {
                  donator: 'Gary Marsh',
                  foodType: 'Onions',
                  quantity: '2kg',
                  harvestDate: '2024-04-08',
                  depositDate: '2024-04-11',
                  pantry: null,
                  selectDate: null,
                  collectDate: null,
                  _id: 'bQEySZVrxMyb4dhn'
                },
                {
                  donator: 'Gary Marsh',
                  foodType: 'Strawberries',
                  quantity: '2kg',
                  harvestDate: '2024-04-08',
                  depositDate: '2024-04-12',
                  pantry: null,
                  selectDate: null,
                  collectDate: null,
                  _id: 'cncpMjnDzFCpihvw'
                },
                {
                  donator: 'Gary Marsh',
                  foodType: 'Onions',
                  quantity: '2kg',
                  harvestDate: '2024-04-08',
                  depositDate: '2024-04-12',
                  pantry: null,
                  selectDate: null,
                  collectDate: null,
                  _id: 'm4VyKCHmFJTdQzAt'
                },
                {
                  donator: 'Gary Marsh',
                  foodType: 'Apples',
                  quantity: '2kg',
                  harvestDate: '2024-03-28',
                  depositDate: '2024-04-14',
                  pantry: null,
                  selectDate: null,
                  collectDate: null,
                  _id: 'mTRPPC2PcIJTcx8W'
                }
              ]
            }
              const res = { render: jest.fn() }
             await  controller.entries_list(req, res)
                 expect(res.render.mock.calls[0][0]).toBe( await 'foodEntries');
            })
        