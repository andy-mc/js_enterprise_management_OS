#!/usr/bin/env node


function get_operating_time(injector_capacity, injector_capacity_balance) {
    if (injector_capacity_balance <= 0) {
        return 'infinite';
    }

    return injector_capacity - injector_capacity_balance;
}


function warp_motor(a_injector_damage, b_injector_damage,
                    c_injector_damage, speed_of_light_percentage) {

    const motor_capacity = 300;
    const injector_capacity = 100;
    const injector_extra_capacity = 99;

    const total_plasma_required = motor_capacity * (speed_of_light_percentage / 100.0);

    const a_injector_capacity = injector_capacity - (injector_capacity * a_injector_damage / 100);
    const b_injector_capacity = injector_capacity - (injector_capacity * b_injector_damage / 100);
    const c_injector_capacity = injector_capacity - (injector_capacity * c_injector_damage / 100);

    let motor_injectors = [a_injector_capacity, b_injector_capacity, c_injector_capacity];

    const actual_motor_plasma_capacity = motor_injectors.reduce((a, b) => a + b, 0);

    const motor_plasma_balance = total_plasma_required - actual_motor_plasma_capacity;

    const avaiable_motor_injectors = motor_injectors.filter(i => i > 0).length;

    const injector_capacity_balance = motor_plasma_balance / avaiable_motor_injectors;

    if (injector_capacity_balance > injector_extra_capacity) {
        return ['Unable to comply', 0];
    }

    const operating_time = get_operating_time(injector_capacity, injector_capacity_balance);

    motor_injectors = motor_injectors.map((injector) => {
        if (injector > 0) {
            return (injector + injector_capacity_balance);
        } else {
            return 0;
        }
    });

    return [motor_injectors, operating_time];
}


function main() {

    console.log('\n<< Welcome to the Enterprise warp motor OS >>\n');

    const a_injector_damage = process.argv[2]
    const b_injector_damage = process.argv[3]
    const c_injector_damage = process.argv[4]
    const speed_of_light_percentage = process.argv[5]

    const [motor_injectors, operating_time] = warp_motor(a_injector_damage, b_injector_damage,
                                                         c_injector_damage, speed_of_light_percentage);

    console.log('Your results are:');

    if (operating_time === 0) {
        console.log(`${motor_injectors}, Time: ${operating_time} min.\n`);
    } else {
        console.log(`A: ${motor_injectors[0]} mg/s, B: ${motor_injectors[1]} mg/s, C: ${motor_injectors[2]} mg/s, Time: ${operating_time} min.\n`);
    }
}


if (require.main === module) {
    main();
}

module.exports = warp_motor;