const maxRule = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: 'EUR',
  },
};

const minRule = {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: 'EUR',
  },
};

const weekLimitRule = {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: 'EUR',
  },
};

export { maxRule, minRule, weekLimitRule };
