<template>
    <div class="filterbox">
        <Row>
            <Col :span="3">颜色</Col>
            <Col :span="21">
                <CheckboxGroup v-model="color">
                    <Checkbox label="红"></Checkbox>
                    <Checkbox label="橙"></Checkbox>
                    <Checkbox label="黄"></Checkbox>
                    <Checkbox label="绿"></Checkbox>
                    <Checkbox label="蓝"></Checkbox>
                    <Checkbox label="灰"></Checkbox>
                    <Checkbox label="黑"></Checkbox>
                    <Checkbox label="白"></Checkbox>
                    <Checkbox label="咖啡"></Checkbox>
                    <Checkbox label="香槟"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col :span="3">变速箱</Col>
            <Col :span="21">
                <CheckboxGroup v-model="gearbox">
                    <Checkbox label="自动挡"></Checkbox>
                    <Checkbox label="手自一体"></Checkbox>
                    <Checkbox label="手动挡"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col :span="3">环保等级</Col>
            <Col :span="21">
                <CheckboxGroup v-model="environmental">
                    <Checkbox label="国一"></Checkbox>
                    <Checkbox label="国二"></Checkbox>
                    <Checkbox label="国三"></Checkbox>
                    <Checkbox label="国四"></Checkbox>
                    <Checkbox label="国五"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col :span="3">燃料</Col>
            <Col :span="21">
                <CheckboxGroup v-model="fuel">
                    <Checkbox label="柴油车"></Checkbox>
                    <Checkbox label="纯电动"></Checkbox>
                    <Checkbox label="汽油车"></Checkbox>
                    <Checkbox label="油电混合"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
         <Row>
            <Col :span="3">排量</Col>
            <Col :span="21">
                <CheckboxGroup v-model="displacement">
                    <Checkbox v-for="item in displacementoptions" :label="item" :key="item"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col :span="3">是否上牌</Col>
            <Col :span="21">
                <Select v-model="licence" style="width:200px">
                    <Option value="无所谓" key="无所谓">无所谓</Option>
                    <Option value="是" key="是">是</Option>
                    <Option value="否" key="否">否</Option>
                </Select>
            </Col>
        </Row>
        <Row>
            <Col :span="3">是否本地车</Col>
            <Col :span="21">
                <Select v-model="locality" style="width:200px">
                    <Option value="无所谓" key="无所谓">无所谓</Option>
                    <Option value="是" key="是">是</Option>
                    <Option value="否" key="否">否</Option>
                </Select>
            </Col>
        </Row>
        <Row>
            <Col :span="3">价格（百万）</Col>
            <Col :span="9">
                <Slider :value="price" range :min="0" :max="100" @on-change="pricechange"></Slider>
            </Col>
            <Col span="1" offset='1'>
                <Button @click="pricechange([0,5])">5万以内</Button>
            </Col>
            <Col span="1" offset='1'>
                <Button @click="pricechange([5,10])">5万~10万</Button>
            </Col>
            <Col span="1" offset='1'>
                <Button @click="pricechange([10,15])">10万~15万</Button>
            </Col>
            <Col span="1" offset='1'>
                <Button @click="pricechange([15,20])">15万~20万</Button>
            </Col>
            <Col span="1" offset='1'>
                <Button @click="pricechange([20,100])">20万以上</Button>
            </Col>
        </Row>
        <Row>
            <Col :span="3">公里数</Col>
            <Col :span="9">
                <Slider :value="km" range :min="0" :max="100" @on-change="kmchange"></Slider>
            </Col>
            <Col span="1" offset='1'>
                <Button @click="kmchange([0,5])">5万以内</Button>
            </Col>
            <Col span="1" offset='1'>
                <Button @click="kmchange([5,10])">5万~10万</Button>
            </Col>
            <Col span="1" offset='1'>
                <Button @click="kmchange([10,15])">10万~15万</Button>
            </Col>
            <Col span="1" offset='1'>
                <Button @click="kmchange([15,20])">15万~20万</Button>
            </Col>
            <Col span="1" offset='1'>
                <Button @click="kmchange([20,100])">20万以上</Button>
            </Col>
        </Row>
        <Row>
            <Col>
                <Col :span="3">
                    当前：
                </Col>
                <Col :span="21" >
                    <Tag v-for="(v ,k , index) in $store.state.filtercar.filterinfo" :key="index" v-if="showtag(v , k)" closable @on-close="closetag(k)">
                        {{dictionary[k]}} : {{showv(k,v)}}
                    </Tag>
                </Col>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      color: [],
      gearbox: [],
      environmental: [],
      fuel: [],
      displacement: [],
      displacementoptions: [
        "1.0L",
        "1.2L",
        "1.6L",
        "1.6T",
        "2.0L",
        "2.0T",
        "5.0L"
      ],
      licence: "无所谓",
      locality: "无所谓",
      dictionary: {
        color: "颜色",
        gearbox: "变速箱",
        environmental: "环保等级",
        fuel: "燃料",
        displacement: "排量",
        licence: "是否上牌",
        locality: "是否本地车",
        price: "价格",
        km: "公里数"
      },
      price: [0, 100],
      km: [0, 100]
    };
  },
  methods: {
    pricechange(v) {
      this.price = v;
      this.$store.dispatch("changefilterinfo", { k: "price", v });
    },
    kmchange(v) {
      this.km = v;
      this.$store.dispatch("changefilterinfo", {
        k: "km",
        v: v.map(item => item * 10000)
      });
    },
    showv(k, v) {
      if (k == "price") {
        return v.map(item => item + "万元").join(" 至 ");
      } else if (k == "km") {
        return v.map(item => item / 10000 + "万公里").join(" 至 ");
      } else if (typeof v == "string") {
        return v;
      } else if (Array.isArray(v)) {
        return v.join(" 或 ");
      }
    },

    showtag(v, k) {
      if (k == "price") {
        if (v[0] != 0 || v[1] != 100) {
          return true;
        }
        return false;
      } else if (k == "km") {
        if (v[0] != 0 || v[1] != 1000000) {
          return true;
        }
        return false;
      } else if (v.length == 0) {
        return false;
      } else {
        return true;
      }
    },
    closetag(k) {
      if (k == "km") {
        this.km = [0, 1000000];
      } else if (k == "price") {
        this.price = [0, 100];
      }
      this.$store.dispatch("delfilterinfo", { k });
    }
  },
  watch: {
    color(v) {
      this.$store.dispatch("changefilterinfo", { k: "color", v });
    },
    gearbox(v) {
      this.$store.dispatch("changefilterinfo", { k: "gearbox", v });
    },
    environmental(v) {
      this.$store.dispatch("changefilterinfo", { k: "environmental", v });
    },
    fuel(v) {
      this.$store.dispatch("changefilterinfo", { k: "fuel", v });
    },
    displacement(v) {
      this.$store.dispatch("changefilterinfo", { k: "displacement", v });
    },
    licence(v) {
      this.$store.dispatch("changefilterinfo", { k: "licence", v });
    },
    locality(v) {
      this.$store.dispatch("changefilterinfo", { k: "locality", v });
    }
  }
};
</script>


<style lang="less" scoped>
.filterbox {
  margin-bottom: 20px;
  .ivu-col-span-3 {
    font-size: 16px;
    color: #333;
  }
  .ivu-row {
    height: 50px;
  }
}
</style>